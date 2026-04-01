function safeDecodeURIComponent(s) {
  try {
    return decodeURIComponent(s)
  } catch {
    return s
  }
}

const NESTED_REDIRECT_KEYS = ['redirect', 'redirectUrl', 'returnUrl', 'return_url']

export function extractLoginToken(search) {
  const params = new URLSearchParams(search)
  let token = params.get('token')
  if (token) return token

  for (const key of NESTED_REDIRECT_KEYS) {
    const redirectVal = params.get(key)
    if (!redirectVal) continue
    try {
      const decoded = decodeURIComponent(redirectVal)
      const m = decoded.match(/[?&]token=([^&]+)/)
      if (m) return safeDecodeURIComponent(m[1])
    } catch {
      /* ignore */
    }
  }

  const m = search.match(/[?&]token=([^&]+)/)
  return m ? safeDecodeURIComponent(m[1]) : null
}
