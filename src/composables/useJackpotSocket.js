import { createJackpotSocket, getSocketDebugInfo, isSocketEnabled } from '@/services/jackpotClient'

/**
 * Centralized Jackpot socket wiring.
 * Keeps event subscriptions in one place and lets the page pass callbacks.
 */
export function useJackpotSocket({
  potId = 1,
  getSteamId = () => null,
  onSubscribe,
  onNewDeposit,
  onValueUpdate,
  onStartTimer,
  onEOSBlock,
  onRoll,
  onLastHistory,
  onLuckiest,
  onConnectError
} = {}) {
  let socket = null

  const connect = () => {
    if (socket || !isSocketEnabled()) return socket
    socket = createJackpotSocket()
    if (!socket) return null

    const debug = getSocketDebugInfo()

    socket.on('connect', () => {
      const payload = {
        potid: potId,
        history: true,
        luckiest: true
      }
      const sid = getSteamId?.()

      socket.emit('jackpot:subscribe', payload, (response) => {
        onSubscribe?.(response)
      })
    })

    socket.on('connect_error', (error) => {
      onConnectError?.(error, debug)
    })

    socket.on('jackpot:newDeposit', (payload) => {
      console.log('payload', payload)
      onNewDeposit?.(payload)
    })

    socket.on(`jackpot:${potId}:valueUpdate`, ({ total_value }) => {
      onValueUpdate?.(total_value)
    })

    socket.on('jackpot:startTimer', ({ start, end, send }) => {
      onStartTimer?.({ start, end, send })
    })

    socket.on('fairness:EOSBlock', ({ block, blockid }) => {
      onEOSBlock?.({ block, blockid })
    })

    socket.on('jackpot:roll', (payload) => {
      onRoll?.(payload)
    })

    socket.on('jackpot:lastHistory', (payload) => {
      onLastHistory?.(payload)
    })

    socket.on('jackpot:luckiest', (payload) => {
      onLuckiest?.(payload)
    })

    return socket
  }

  const disconnect = () => {
    if (!socket) return
    socket.removeAllListeners()
    socket.disconnect()
    socket = null
  }

  const getSocket = () => socket

  return { connect, disconnect, getSocket }
}
