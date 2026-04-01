/**
 * Nav jackpot total for everyone, including unsigned users.
 *
 * - Initial value: `emit('jackpot:getValue', { potid }, ack)` — server returns current total in the callback.
 * - Live updates: `jackpot:<potid>:valueUpdate` with `{ total_value }` (or numeric).
 */
import { createJackpotSocket, isSocketEnabled } from './jackpotClient'
import { getSteamId } from '@/auth/session'
import { store } from '@/store'

export const JACKPOT_NAV_POTID = 1

const VALUE_UPDATE_EVENT = `jackpot:${JACKPOT_NAV_POTID}:valueUpdate`

let navSocket = null
let activeTeardown = null

function totalValueFromPayload(raw) {
  if (raw == null) return null
  if (typeof raw === 'object' && raw !== null && 'total_value' in raw) {
    return raw.total_value
  }
  return raw
}

function applyNavTotal(raw) {
  const v = totalValueFromPayload(raw)
  if (v == null || v === '') return
  store.commit('setJackpotNavTotal', v)
}

export function teardownJackpotNavSocket() {
  activeTeardown?.()
  activeTeardown = null
}

export function initJackpotNavSocket() {
  if (!isSocketEnabled()) return () => {}
  teardownJackpotNavSocket()
  navSocket = createJackpotSocket()
  if (!navSocket) return () => {}

  const requestNavValue = () => {
    navSocket.emit(
      'jackpot:getValue',
      { potid: JACKPOT_NAV_POTID },
      (response) => {
        if (response != null) applyNavTotal(response)
      }
    )
  }

  const onConnect = () => {
    const payload = {
      potid: JACKPOT_NAV_POTID,
      history: false,
      luckiest: false
    }
    const sid = getSteamId()
    if (sid) payload.steamid = sid
    navSocket.emit('jackpot:subscribe', payload)

    requestNavValue()
  }

  const onAnyValueUpdate = (event, ...args) => {
    if (event !== VALUE_UPDATE_EVENT) return
    applyNavTotal(args[0])
  }

  navSocket.onAny(onAnyValueUpdate)
  navSocket.on('connect', onConnect)
  if (navSocket.connected) onConnect()

  activeTeardown = () => {
    if (!navSocket) return
    navSocket.off('connect', onConnect)
    navSocket.offAny(onAnyValueUpdate)
    navSocket.disconnect()
    navSocket = null
  }
  return activeTeardown
}
