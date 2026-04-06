/**
 * Socket.IO connection check — mirrors the browser snippet:
 *   io(url, { transports: ["websocket"] })
 *
 * Run: npm run test:socket
 * Optional: SOCKET_TEST_URL, SOCKET_TEST_PATH (default /socket.io)
 *
 * If both websocket and polling fail, the server is not serving Socket.IO at
 * that path (e.g. HTTP 404 on /socket.io). Fix path/port on the backend or set
 * SOCKET_TEST_PATH to the real Engine.IO mount.
 */
import { io } from 'socket.io-client'

const url = process.env.SOCKET_TEST_URL || 'https://116.202.242.165:2083'
const path = process.env.SOCKET_TEST_PATH || '/socket.io'

function probeHttp() {
  const probe = `${url.replace(/\/$/, '')}${path}/?EIO=4&transport=polling`
  return fetch(probe, { method: 'GET' })
    .then((res) => ({ probe, status: res.status, ok: res.ok }))
    .catch((e) => ({ probe, error: e.message }))
}

function tryConnect(transports) {
  return new Promise((resolve, reject) => {
    const socket = io(url, {
      path,
      transports,
      reconnection: false,
      timeout: 20000
    })
    const t = setTimeout(() => {
      socket.close()
      reject(new Error('timeout'))
    }, 22000)
    socket.on('connect', () => {
      clearTimeout(t)
      const id = socket.id
      socket.close()
      resolve({ transports, id })
    })
    socket.on('connect_error', (err) => {
      clearTimeout(t)
      socket.close()
      reject(err)
    })
  })
}

console.log('URL:', url)
console.log('path:', path)
console.log('')

const httpInfo = await probeHttp()
if ('status' in httpInfo) {
  console.log('HTTP probe:', httpInfo.probe)
  console.log('  → status:', httpInfo.status, httpInfo.ok ? '(handshake URL reachable)' : '(not OK — Socket.IO may be missing or path wrong)')
} else {
  console.log('HTTP probe failed:', httpInfo.error)
}
console.log('')

let connected = false

console.log('1) transports: ["websocket"] (your snippet)')
try {
  const r = await tryConnect(['websocket'])
  console.log('   Connected, socket.id:', r.id)
  connected = true
} catch (e) {
  console.log('   Failed:', e.message || e)
}

if (!connected) {
  console.log('')
  console.log('2) transports: ["polling"] (fallback — some servers need polling first)')
  try {
    const r = await tryConnect(['polling'])
    console.log('   Connected, socket.id:', r.id)
    connected = true
  } catch (e) {
    console.log('   Failed:', e.message || e)
  }
}

if (!connected) {
  console.log('')
  console.log('3) transports: ["websocket", "polling"] (default client behavior)')
  try {
    const r = await tryConnect(['websocket', 'polling'])
    console.log('   Connected, socket.id:', r.id)
    connected = true
  } catch (e) {
    console.log('   Failed:', e.message || e)
  }
}

console.log('')
if (connected) {
  console.log('Result: OK — at least one transport reached the Socket.IO server.')
  process.exit(0)
}
console.log('Result: FAILED — no connection. Confirm Socket.IO is running and SOCKET_TEST_PATH matches the server.')
process.exit(1)
