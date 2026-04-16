import { io } from 'socket.io-client'
import { getAuthToken } from '@/auth/session'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')

/**
 * Direct Engine.IO URL (dev tools / overrides only). REST uses :2052 — not the same port.
 * Port 2083 is plain HTTP on the origin; the browser must not open `https://<ip>:2083` (ERR_SSL_PROTOCOL_ERROR).
 * Default is **same-origin** (`window.location.origin`): Vite and Vercel proxy `/socket.io` → this host.
 * Override with `VITE_SOCKET_URL` / `VITE_SOCKET_HOST`, or set `VITE_SOCKET_RELATIVE=false` and a working HTTPS URL.
 */
export const SOCKET_SERVER_ORIGIN = 'http://116.202.242.165:2083'

/** @deprecated Use SOCKET_SERVER_ORIGIN */
export const BACKEND_ORIGIN = SOCKET_SERVER_ORIGIN

function parseSocketHostname(raw) {
  let h = String(raw).trim().replace(/^https?:\/\//i, '')
  const slash = h.indexOf('/')
  if (slash !== -1) h = h.slice(0, slash)
  const colon = h.indexOf(':')
  if (colon !== -1) h = h.slice(0, colon)
  return h
}

/** When not `'false'`, connect to `window.location.origin` so `/socket.io` is proxied (Vite/Vercel) — avoids mixed content and bogus HTTPS-to-IP. */
function socketUseSameOrigin() {
  return import.meta.env.VITE_SOCKET_RELATIVE !== 'false'
}

/**
 * Resolved URL for `io()` (runtime).
 * Priority: `VITE_SOCKET_URL` → `VITE_SOCKET_HOST` + port → same-origin (default) → `SOCKET_SERVER_ORIGIN`.
 */
export function getSocketUrl() {
  const explicit = (import.meta.env.VITE_SOCKET_URL || '').trim()
  if (explicit) return explicit.replace(/\/$/, '')

  const hostRaw = (import.meta.env.VITE_SOCKET_HOST || '').trim()
  if (hostRaw) {
    const hostname = parseSocketHostname(hostRaw)
    if (hostname) {
      const port = String(import.meta.env.VITE_SOCKET_PORT || '2083').trim() || '2083'
      return `https://${hostname}:${port}`
    }
  }

  if (socketUseSameOrigin() && typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin
  }

  return SOCKET_SERVER_ORIGIN
}

/** Set `VITE_SOCKET_FORCE_POLLING=true` to use polling only (no WebSocket upgrade). */
const SOCKET_FORCE_POLLING = import.meta.env.VITE_SOCKET_FORCE_POLLING === 'true'

/**
 * Engine.IO pathname on that server (Socket.IO default). Only use a different value if the API mounts Socket.IO elsewhere (e.g. `/ws`).
 */
const SOCKET_PATH =
  (import.meta.env.VITE_SOCKET_PATH || '/socket.io').replace(/\/$/, '') || '/socket.io'
export function isSocketEnabled() {
  return import.meta.env.VITE_SOCKET_ENABLED !== 'false'
}

export function getSocketDebugInfo() {
  const sameOrigin = socketUseSameOrigin()
  return {
    enabled: isSocketEnabled(),
    socketServerUrl: SOCKET_SERVER_ORIGIN,
    viteSocketHost: (import.meta.env.VITE_SOCKET_HOST || '').trim() || undefined,
    viteSocketUrl: (import.meta.env.VITE_SOCKET_URL || '').trim() || undefined,
    viteSocketRelative: sameOrigin ? 'true (default)' : 'false',
    ioUrl: getSocketUrl(),
    enginePath: SOCKET_PATH,
    transports: SOCKET_FORCE_POLLING ? ['polling'] : ['polling', 'websocket']
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
    amount: toNumber(item?.amount, 1),
    /** Per-deposit win chance when API sends it (0–100 or 0–1). */
    chance: item?.chance != null ? toNumber(item.chance, NaN) : NaN
  }
}

/**
 * Collect skin/item arrays from various API shapes (items, skins, nested deposits).
 */
function sourcePlayerItems(player) {
  if (!player || typeof player !== 'object') return []
  const tryArrays = [
    player.items,
    player.skins,
    player.inventory,
    player.bet_items,
    player.deposited_items
  ]
  for (const arr of tryArrays) {
    if (Array.isArray(arr) && arr.length > 0) return arr
  }
  if (Array.isArray(player.deposits)) {
    const out = []
    for (const d of player.deposits) {
      if (Array.isArray(d?.skins)) out.push(...d.skins)
      else if (Array.isArray(d?.items)) out.push(...d.items)
    }
    if (out.length > 0) return out
  }
  for (const arr of tryArrays) {
    if (Array.isArray(arr)) return arr
  }
  return []
}

function normalizePlayer(player) {
  const items = sourcePlayerItems(player).map(normalizeItem)
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
        player?.percentage_ticket_range?.lowest ??
          player?.ticketRange?.min ??
          player?.ticket_min ??
          player?.ticket_low,
        0
      ),
      highest: toNumber(
        player?.percentage_ticket_range?.highest ??
          player?.ticketRange?.max ??
          player?.ticket_max ??
          player?.ticket_high,
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

/**
 * Convert API timestamps to milliseconds. Supports Unix seconds and ms.
 */
export function serverTimestampToMs(ts) {
  const n = toNumber(ts, NaN)
  if (!Number.isFinite(n) || n <= 0) return null
  return n < 1e12 ? Math.round(n * 1000) : Math.round(n)
}

function normalizeRound(round) {
  if (!round || typeof round !== 'object') return null
  const base = round.jackpot ?? round

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

/**
 * If the API returns players without `items` (common on list/poll endpoints), keep prior
 * items so the lobby still shows each user's skins after refresh.
 */
export function mergeRoundPlayersPreservingItems(prevPlayers, nextPlayers) {
  if (!Array.isArray(nextPlayers)) return nextPlayers
  const prev = Array.isArray(prevPlayers) ? prevPlayers : []
  return nextPlayers.map((np) => {
    const match = prev.find(
      (p) =>
        (np.steamid != null &&
          p.steamid != null &&
          String(p.steamid) === String(np.steamid)) ||
        (np.offerid != null &&
          p.offerid != null &&
          String(np.offerid) === String(p.offerid))
    )
    if (!match) return np
    const nextItems = Array.isArray(np.items) ? np.items : []
    const prevItems = Array.isArray(match.items) ? match.items : []
    if (nextItems.length > 0) return np
    if (prevItems.length > 0) return { ...np, items: prevItems }
    return np
  })
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
 * @param {{ steamid: string, trade_url: string }} params
 * @returns {Promise<Record<string, unknown>>}
 */
export async function updateTradeURL({ steamid, trade_url }) {
  const res = await fetch(`${API_BASE_URL}/user/updateTradeURL`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders()
    },
    body: JSON.stringify({ steamid, trade_url })
  })
  const data = await parseJsonBody(res)
  if (data?.error === true) {
    throw new Error(data?.error_message || 'Request failed')
  }
  if (!res.ok) {
    throw new Error(data?.error_message || `HTTP ${res.status}`)
  }
  return data
}

/** Single shared Socket.IO manager for the SPA (nav + jackpot views). */
let sharedJackpotSocket = null

/**
 * Returns the one jackpot Socket.IO client, creating it on first use.
 * Same-origin + proxy: no CORS from the browser.
 */
export function getSharedJackpotSocket() {
  if (!isSocketEnabled()) return null
  if (sharedJackpotSocket) return sharedJackpotSocket

  const token = getAuthToken()

  sharedJackpotSocket = io(getSocketUrl(), {
    path: SOCKET_PATH,
    // Polling first (Socket.IO default): WSS upgrade often fails behind Cloudflare / TLS edge; polling over HTTPS works.
    transports: SOCKET_FORCE_POLLING ? ['polling'] : ['polling', 'websocket'],
    upgrade: !SOCKET_FORCE_POLLING,
    reconnection: true,
    reconnectionAttempts: 8,
    reconnectionDelay: 1000,
    timeout: 20000,
    forceNew: false,
    // Omit `auth` when logged out — some servers reject `{}` with "server error".
    ...(token ? { auth: { token } } : {})
  })
  return sharedJackpotSocket
}

/** Disconnect the shared client (e.g. full app teardown). Next `getSharedJackpotSocket()` creates a new one. */
export function destroySharedJackpotSocket() {
  if (!sharedJackpotSocket) return
  sharedJackpotSocket.disconnect()
  sharedJackpotSocket = null
}

/** @deprecated Prefer `getSharedJackpotSocket()` — one connection per page. */
export function createJackpotSocket() {
  return getSharedJackpotSocket()
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
  const data = await request(`/inventory/load?steamid=${steamid}`)
  const inventory = Array.isArray(data) ? data : data?.inventory ?? []
  return inventory.map(normalizeItem)
}

export async function depositToJackpot({ steamid, skins }) {
  const controller = new AbortController()
  const t = setTimeout(() => controller.abort(), 60000)
  try {
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

/**
 * Trade URL from `jackpot:roll` payload (shape varies by backend).
 */
export function tradeOfferUrlFromJackpotRollPayload(payload) {
  if (!payload || typeof payload !== 'object') return ''
  const w = payload.winner_data || payload.winner || {}
  const candidates = [
    payload.trade_offer_url,
    payload.tradeOfferUrl,
    payload.trade_url,
    payload.steam_trade_url,
    payload.offer_url,
    payload.offerUrl,
    w.trade_offer_url,
    w.tradeOfferUrl,
    w.trade_url,
    w.offer_url,
    w.steam_trade_url
  ]
  for (const c of candidates) {
    const s = typeof c === 'string' ? c.trim() : ''
    if (/^https?:\/\//i.test(s)) return s
  }
  const id =
    payload.tradeofferid ??
    payload.trade_offer_id ??
    payload.tradeOfferId ??
    w.tradeofferid ??
    w.trade_offer_id
  if (id != null && String(id).trim() !== '') {
    const n = String(id).replace(/\D/g, '')
    if (n) return `https://steamcommunity.com/tradeoffer/${n}/`
  }
  return ''
}

/**
 * Flatten all deposited items in the round for the winner popup grid.
 */
export function potItemsFlattenedForDisplay(players) {
  const out = []
  for (const p of Array.isArray(players) ? players : []) {
    const items = sourcePlayerItems(p)
    for (const raw of items) {
      const it = normalizeItem(raw)
      out.push({
        name: it.name,
        image: it.image || '/img/user/userImage.png',
        price: it.price
      })
    }
  }
  return out
}

export { normalizeHistoryEntry, normalizePlayer, normalizeRound, toNumber }
