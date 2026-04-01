import { ref } from 'vue'

const KEY = 'hellgg_auth'

export const authVersion = ref(0)

function bumpAuthVersion() {
  authVersion.value += 1
}

export function getAuth() {
  try {
    const raw = sessionStorage.getItem(KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function setAuth(auth) {
  sessionStorage.setItem(KEY, JSON.stringify(auth ?? {}))
  bumpAuthVersion()
}

export function mergeAuth(partial) {
  const cur = getAuth()
  if (!cur) return
  sessionStorage.setItem(KEY, JSON.stringify({ ...cur, ...partial }))
  bumpAuthVersion()
}

export function clearAuth() {
  sessionStorage.removeItem(KEY)
  bumpAuthVersion()
}

export function getSteamId() {
  return getAuth()?.steamid ?? null
}

export function getAuthToken() {
  const t = getAuth()?.token
  return typeof t === 'string' && t.trim() ? t.trim() : null
}

export function isLoggedIn() {
  return Boolean(getSteamId())
}

