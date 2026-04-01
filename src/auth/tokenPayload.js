/**
 * Parse auth token returned on login (?token=...). May be JWT or raw base64 JSON.
 */
export function parseAuthToken(raw) {
  if (!raw || typeof raw !== 'string') return null
  const trimmed = raw.trim()
  try {
    const parts = trimmed.split('.')
    if (parts.length === 3) {
      const payload = parts[1]
      const b64 = payload.replace(/-/g, '+').replace(/_/g, '/')
      const pad = '='.repeat((4 - (b64.length % 4)) % 4)
      const json = atob(b64 + pad)
      return JSON.parse(json)
    }
    const b64 = trimmed.replace(/-/g, '+').replace(/_/g, '/')
    const pad = '='.repeat((4 - (b64.length % 4)) % 4)
    const json = atob(b64 + pad)
    const data = JSON.parse(json)
    return typeof data === 'object' && data != null ? data : null
  } catch {
    return null
  }
}

const STEAM64_RE = /^7656119\d{10}$/

/** Best-effort Steam64 / user id from token payload (field names vary by API). */
export function steamIdFromTokenPayload(payload) {
  if (!payload || typeof payload !== 'object') return null
  const candidates = [
    payload.steamid,
    payload.steam_id,
    payload.steamId,
    payload.user?.steamid,
    payload.user?.steam_id,
    payload.user?.id,
    payload.data?.steamid,
    payload.profile?.steamid,
    payload.sub
  ]
  for (const c of candidates) {
    if (c == null) continue
    const s = String(c).trim()
    if (s && STEAM64_RE.test(s)) return s
  }
  for (const c of candidates) {
    if (c == null) continue
    const s = String(c).trim()
    if (s) return s
  }
  return null
}
