import { clearAuth, mergeAuth, setAuth } from '@/auth/session'
import { extractLoginToken } from '@/auth/loginCallback'
import { parseAuthToken, steamIdFromTokenPayload } from '@/auth/tokenPayload'
import { fetchSteamPlayerSummary } from '@/services/steamProfile'

export function stripOAuthQueryFromUrl() {
  if (typeof window === 'undefined') return
  try {
    const u = new URL(window.location.href)
    const clean = u.pathname + u.hash
    window.history.replaceState(window.history.state, '', clean)
  } catch {
    /* ignore */
  }
}

function finishOAuthNavigation() {
  stripOAuthQueryFromUrl()
  return { path: '/', replace: true }
}

export async function tryCompleteOAuthFromSearch(search) {
  if (!search || search === '?') return null

  const params = new URLSearchParams(search)
  const tokenParam = extractLoginToken(search)

  if (tokenParam) {
    clearAuth()
    const payload = parseAuthToken(tokenParam)
    const steamid = steamIdFromTokenPayload(payload) || params.get('steamid')
    if (!steamid) {
      return finishOAuthNavigation()
    }
    setAuth({
      token: tokenParam,
      steamid,
      ...(payload && typeof payload === 'object'
        ? {
            personaname: payload.personaname ?? payload.name ?? payload.username,
            avatarUrl: payload.avatarUrl ?? payload.avatar ?? payload.avatarfull
          }
        : {})
    })
    stripOAuthQueryFromUrl()
    try {
      const profile = await fetchSteamPlayerSummary(steamid)
      if (profile) {
        mergeAuth({
          personaname: profile.personaname,
          avatarUrl: profile.avatarfull
        })
      }
    } catch {
      /* ignore */
    }
    return { path: '/', replace: true }
  }

  const steamid = params.get('steamid')
  if (steamid) {
    clearAuth()
    setAuth({ steamid, token: params.get('token') || undefined })
    stripOAuthQueryFromUrl()
    try {
      const profile = await fetchSteamPlayerSummary(steamid)
      if (profile) {
        mergeAuth({
          personaname: profile.personaname,
          avatarUrl: profile.avatarfull
        })
      }
    } catch {
      /* ignore */
    }
    return { path: '/', replace: true }
  }

  return null
}
