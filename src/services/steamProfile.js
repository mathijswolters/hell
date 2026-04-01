/**
 * Steam profile via ISteamUser/GetPlayerSummaries (Steam Web API).
 * Dev: use Vite proxy `/steam-api` → api.steampowered.com (avoids CORS).
 * Prod: set VITE_STEAM_PROFILE_URL to a same-origin backend that proxies Steam,
 * or configure your host to proxy `/steam-api` — direct browser calls to
 * api.steampowered.com often fail CORS; exposing VITE_STEAM_WEB_API_KEY in the
 * client bundle is also discouraged for production.
 */

function normalizeFromSteamPayload(data) {
  const p = data?.response?.players?.[0]
  if (!p) return null
  return {
    steamid: p.steamid,
    personaname: p.personaname,
    avatarfull: p.avatarfull
  }
}

function normalizeCustomResponse(data) {
  if (data?.personaname && (data.avatarfull || data.avatarUrl)) {
    return {
      steamid: data.steamid,
      personaname: data.personaname,
      avatarfull: data.avatarfull || data.avatarUrl
    }
  }
  return normalizeFromSteamPayload(data)
}

/**
 * @param {string} steamid Steam64
 * @returns {Promise<{ steamid: string, personaname: string, avatarfull: string } | null>}
 */
export async function fetchSteamPlayerSummary(steamid) {
  const customBase = import.meta.env.VITE_STEAM_PROFILE_URL?.replace(/\/$/, '')
  if (customBase) {
    const url = `${customBase}?steamid=${encodeURIComponent(steamid)}`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    return normalizeCustomResponse(data)
  }

  const key = import.meta.env.VITE_STEAM_WEB_API_KEY
  if (!key) return null

  const qs = new URLSearchParams({ key, steamids: steamid })
  const path = `/ISteamUser/GetPlayerSummaries/v0002/?${qs.toString()}`
  const url = import.meta.env.DEV
    ? `/steam-api${path}`
    : `https://api.steampowered.com${path}`

  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json()
  return normalizeFromSteamPayload(data)
}
