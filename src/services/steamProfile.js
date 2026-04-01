/**
 * Steam profile via ISteamUser/GetPlayerSummaries (Steam Web API).
 * Same-origin `/steam-api` — Vite proxy (dev) or `vercel.json` rewrite →
 * api.steampowered.com (avoids CORS). Override with `VITE_STEAM_PROFILE_URL` if
 * you host without that proxy.
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
  // Same-origin `/steam-api` — Vite proxy (dev) or `vercel.json` → api.steampowered.com (avoids CORS in prod).
  const url = `/steam-api${path}`

  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json()
  return normalizeFromSteamPayload(data)
}
