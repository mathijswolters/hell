const DEFAULT_STEAM_AUTH_URL = 'https://rstspcl.com/auth/steam/'

export function startSteamOAuth(redirectTo = '/') {
  const loginUrl = import.meta.env.VITE_STEAM_OAUTH_URL || import.meta.env.VITE_STEAM_LOGIN_URL
  const safeBaseUrl =
    typeof loginUrl === 'string' && loginUrl.trim() ? loginUrl.trim() : DEFAULT_STEAM_AUTH_URL
  const safeRedirect = typeof redirectTo === 'string' && redirectTo.startsWith('/') ? redirectTo : '/'
  const returnPage = `${window.location.origin}/?redirect=${encodeURIComponent(safeRedirect)}`
  const paramName = import.meta.env.VITE_STEAM_LOGIN_RETURN_PARAM || 'returnURL'
  const joiner = safeBaseUrl.includes('?') ? '&' : '?'
  window.location.href = `${safeBaseUrl}${joiner}${paramName}=${encodeURIComponent(returnPage)}`
}
