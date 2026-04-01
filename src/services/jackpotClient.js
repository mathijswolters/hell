import { io } from 'socket.io-client'
import { getAuthToken } from '@/auth/session'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

/**
 * Socket.IO server origin (port 2082). REST uses :2052 — not the same port.
 * Must match `vite.config.js` `SOCKET_ORIGIN`.
 */
export const SOCKET_SERVER_ORIGIN = 'http://116.202.242.165:2082'

/** @deprecated Use SOCKET_SERVER_ORIGIN */
export const BACKEND_ORIGIN = SOCKET_SERVER_ORIGIN

/**
 * Where `io()` connects: `VITE_SOCKET_URL` if set; dev → same-origin (Vite proxies `/socket.io` → :2082); prod → SOCKET_SERVER_ORIGIN.
 */
const SOCKET_URL = (() => {
  const env = import.meta.env.VITE_SOCKET_URL
  if (env !== undefined && String(env).trim() !== '') return String(env).replace(/\/$/, '')
  if (import.meta.env.DEV) return ''
  return SOCKET_SERVER_ORIGIN
})()

/**
 * Engine.IO pathname on that server (Socket.IO default). Only use a different value if the API mounts Socket.IO elsewhere (e.g. `/ws`).
 */
const SOCKET_PATH =
  (import.meta.env.VITE_SOCKET_PATH || '/socket.io').replace(/\/$/, '') || '/socket.io'
export function isSocketEnabled() {
  return import.meta.env.VITE_SOCKET_ENABLED !== 'false'
}

export function getSocketDebugInfo() {
  const forcePolling = import.meta.env.DEV || import.meta.env.VITE_SOCKET_FORCE_POLLING === 'true'
  return {
    enabled: isSocketEnabled(),
    socketServerUrl: SOCKET_SERVER_ORIGIN,
    ioUrl: SOCKET_URL || `(same origin → proxy ${SOCKET_SERVER_ORIGIN})`,
    enginePath: SOCKET_PATH,
    transports: forcePolling ? ['polling'] : ['websocket', 'polling']
  }
}

function toNumber(value, fallback = 0) {
  const num = Number(value)
  return Number.isFinite(num) ? num : fallback
}

/** Steam CDN host for economy item images (same hash as fastly/cloud; no /360fx360f suffix). */
const STEAM_ECONOMY_IMAGE_AKAMAI = 'https://community.akamai.steamstatic.com/economy/image'

/**
 * Normalize any Steam economy image reference to Akamai format:
 * `https://community.akamai.steamstatic.com/economy/image/<hash>`
 */
export function normalizeSteamEconomyImageUrl(input) {
  if (input == null || input === '') return ''
  const s = String(input).trim()
  if (s.startsWith('data:')) return s
  const fromPath = s.match(/\/economy\/image\/([^/?]+)/i)
  if (fromPath) return `${STEAM_ECONOMY_IMAGE_AKAMAI}/${fromPath[1]}`
  if (/^[a-zA-Z0-9_-]+$/.test(s) && s.length >= 8) {
    return `${STEAM_ECONOMY_IMAGE_AKAMAI}/${s}`
  }
  return s
}

function normalizeItem(item) {
  const rawImage = item?.image ?? item?.icon_url ?? item?.icon ?? ''
  return {
    id: item?.id ?? item?.assetid ?? item?.asset_id ?? item?._id ?? crypto.randomUUID(),
    assetid: item?.assetid ?? item?.asset_id ?? item?.id ?? null,
    offerid: item?.offerid ?? item?.offer_id ?? null,
    name: item?.name ?? item?.market_hash_name ?? 'Item',
    image: normalizeSteamEconomyImageUrl(rawImage) || rawImage,
    price: toNumber(item?.price ?? item?.value ?? item?.amount, 0),
    amount: toNumber(item?.amount, 1)
  }
}

function normalizePlayer(player) {
  const items = Array.isArray(player?.items) ? player.items.map(normalizeItem) : []
  const value =
    toNumber(player?.value, NaN) ??
    toNumber(player?.wager, NaN) ??
    toNumber(player?.deposited, NaN) ??
    toNumber(player?.total, NaN)
  const safeValue = Number.isFinite(value)
    ? value
    : items.reduce((sum, item) => sum + toNumber(item.price, 0), 0)

  return {
    _id: player?._id ?? player?.id ?? player?.steamid ?? player?.offerid ?? crypto.randomUUID(),
    steamid: player?.steamid ?? null,
    offerid: player?.offerid ?? player?.offer_id ?? null,
    name: player?.name ?? player?.username ?? 'Unknown',
    avatar: player?.avatar ?? player?.image ?? '/img/user/userImage.png',
    value: safeValue,
    chance: toNumber(player?.chance, 0),
    items,
    percentage_ticket_range: {
      lowest: toNumber(
        player?.percentage_ticket_range?.lowest ?? player?.ticketRange?.min ?? player?.ticket_min,
        0
      ),
      highest: toNumber(
        player?.percentage_ticket_range?.highest ?? player?.ticketRange?.max ?? player?.ticket_max,
        0
      )
    },
    ticketRange: {
      min: toNumber(player?.ticketRange?.min ?? player?.ticket_min, 0),
      max: toNumber(player?.ticketRange?.max ?? player?.ticket_max, 0)
    }
  }
}

function normalizeHistoryEntry(entry) {
  const gameid = entry?.gameid ?? entry?.id ?? entry?._id ?? null
  return {
    _id: entry?._id ?? entry?.id ?? entry?.gameid ?? crypto.randomUUID(),
    gameid,
    name: entry?.name ?? entry?.winner?.name ?? entry?.winner_name ?? 'Unknown',
    winnings: toNumber(
      entry?.winnings ?? entry?.value ?? entry?.pot_value ?? entry?.pot ?? entry?.winner?.winnings,
      0
    ),
    chance: toNumber(entry?.chance ?? entry?.winner?.chance, 0),
    avatar:
      entry?.avatar ??
      entry?.winner?.avatar ??
      entry?.winner_image ??
      '/img/user/userImage.png',
    ticket: toNumber(entry?.ticket ?? entry?.winner?.ticket, 0)
  }
}

function normalizeRound(round) {
  const base = round?.jackpot ?? round

  let players = []
  if (Array.isArray(base?.players)) {
    players = base.players.map(normalizePlayer)
  } else if (Array.isArray(base?.participants)) {
    players = base.participants.map(normalizePlayer)
  } else if (Array.isArray(base?.deposits)) {
    players = base.deposits.map(normalizePlayer)
  }

  return {
    _id: base?._id ?? base?.id ?? base?.gameid ?? 1,
    potid: toNumber(base?.potid ?? round?.potid, 1),
    players,
    status: base?.status ?? base?.state ?? null,
    roll: toNumber(base?.roll, 0),
    winner: base?.winner ?? null,
    server_time: toNumber(round?.server_time ?? base?.server_time, 0),
    start: toNumber(base?.start, 0),
    end: toNumber(base?.end, 0)
  }
}

async function parseJsonBody(res) {
  const text = await res.text()
  if (!text || !text.trim()) return {}
  try {
    return JSON.parse(text)
  } catch {
    throw new Error('Invalid JSON response from server')
  }
}

function authHeaders() {
  const token = getAuthToken()
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers || {})
    }
  })
  if (!res.ok) {
    const msg = await res.text()
    throw new Error(`HTTP ${res.status}: ${msg}`)
  }
  return parseJsonBody(res)
}

/**
 * Same-origin in dev (Vite proxy) avoids CORS. Set VITE_SOCKET_URL only if the API
 * sends Access-Control-Allow-Origin for your frontend origin.
 */
export function createJackpotSocket() {
  if (!isSocketEnabled()) return null

  const target = SOCKET_URL || undefined
  const forcePolling = import.meta.env.DEV || import.meta.env.VITE_SOCKET_FORCE_POLLING === 'true'
  const token = getAuthToken()
  const handshakeAuth = token ? { token } : {}

  return io(target, {
    path: SOCKET_PATH,
    transports: forcePolling ? ['polling'] : ['websocket', 'polling'],
    upgrade: !forcePolling,
    reconnection: true,
    reconnectionAttempts: 8,
    reconnectionDelay: 1000,
    timeout: 20000,
    forceNew: true,
    auth: handshakeAuth
  })
}

export async function getRound({ potid = 1, history = true, lucky = true } = {}) {
  const data = await request(
    `/jackpot/getRound?potid=${potid}&history=${history}&lucky=${lucky}`
  )
  return normalizeRound(data)
}

export async function getHistory() {
  const data = await request('/jackpot/getHistory')
  if (Array.isArray(data)) return data.map(normalizeHistoryEntry)
  if (Array.isArray(data?.history)) return data.history.map(normalizeHistoryEntry)
  return []
}

export async function getLuckiest() {
  const data = await request('/jackpot/getLuckiest')
  if (Array.isArray(data)) return data.map(normalizeHistoryEntry)[0] ?? null
  if (data?.luckiest) return normalizeHistoryEntry(data.luckiest)
  return normalizeHistoryEntry(data)
}

export async function getLastHistory({ gameid, potid = 1 }) {
  const query = `?gameid=${gameid}&potid=${potid}`
  const data = await request(`/jackpot/getLastHistory${query}`)
  if (data?.history) return normalizeHistoryEntry(data.history)
  return normalizeHistoryEntry(data)
}

/**
 * Full round details for history “view” (deposits, skins, winner, fairness).
 * GET `/jackpot/getDetails?gameid=&potid=`
 */
export async function getJackpotDetails({ gameid, potid = 1 }) {
  const q = `?gameid=${encodeURIComponent(String(gameid))}&potid=${encodeURIComponent(String(potid))}`
  const data = await request(`/jackpot/getDetails${q}`)
  if (data?.error) {
    throw new Error(data?.error_message || 'Could not load game details')
  }
  return data?.details ?? null
}

export async function loadInventory(steamid) {
  steamid = '76561197984485194';
  const data = await request(`/inventory/load?steamid=${steamid}`)
  const inventory = Array.isArray(data) ? data : data?.inventory ?? []
  return inventory.map(normalizeItem)
}

export async function depositToJackpot({ steamid, skins }) {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), 60000)
  try {
    steamid = '76561197984485194';
    return await request(`/jackpot/deposit?steamid=${steamid}`, {
      method: 'POST',
      body: JSON.stringify({ steamid, skins }),
      signal: controller.signal
    })
  } catch (e) {
    if (e?.name === 'AbortError') {
      throw new Error('Deposit timed out — try again or check your connection.')
    }
    throw e
  } finally {
    clearTimeout(t)
  }
}

/**
 * Notify jackpot room over Socket.IO after a successful REST deposit (or if your API expects this instead of POST, call accordingly).
 */
export function emitJackpotDeposit(socket, { potid, steamid, skins }) {
  if (!socket?.connected) return false
  socket.emit('jackpot:deposit', { potid, steamid, skins })
  return true
}

export { normalizeHistoryEntry, normalizePlayer, normalizeRound, toNumber }
