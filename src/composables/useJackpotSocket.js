import { getSharedJackpotSocket, getSocketDebugInfo, isSocketEnabled } from '@/services/jackpotClient'

/**
 * Centralized Jackpot socket wiring.
 * Uses the shared Socket.IO client (one connection per page load); only registers listeners here.
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
  let lobbyHandlers = null

  const connect = () => {
    if (socket || !isSocketEnabled()) return socket
    socket = getSharedJackpotSocket()
    if (!socket) return null

    const debug = getSocketDebugInfo()

    const runLobbySubscribe = () => {
      const payload = {
        potid: potId,
        history: true,
        luckiest: true
      }
      const sid = getSteamId?.()
      if (sid) payload.steamid = sid
      console.log('socket is connected')

      socket.emit('jackpot:subscribe', payload, (response) => {
        onSubscribe?.(response)
      })
    }

    lobbyHandlers = {
      connect: () => {
        runLobbySubscribe()
      },
      // jackpotSubscribe: (response) => {
      //   onSubscribe?.(response)
      // },
      connectError: (error) => {
        onConnectError?.(error, debug)
      },
      newDeposit: (payload) => {
        onNewDeposit?.(payload)
      },
      valueUpdate: ({ total_value }) => {
        onValueUpdate?.(total_value)
      },
      startTimer: ({ start, end, send }) => {
        onStartTimer?.({ start, end, send })
      },
      eosBlock: ({ block }) => {
        onEOSBlock?.(block)
      },
      roll: (payload) => {
        console.log('=====roll=====>', payload)
        onRoll?.(payload)
      },
      lastHistory: (payload) => {
        onLastHistory?.(payload)
      },
      luckiest: (payload) => {
        onLuckiest?.(payload)
      }
    }

    socket.on('connect', lobbyHandlers.connect)
    socket.on('jackpot:subscribe', lobbyHandlers.jackpotSubscribe)
    socket.on('jackpot', lobbyHandlers.fff)
    socket.on('connect_error', lobbyHandlers.connectError)
    socket.on('jackpot:newDeposit', lobbyHandlers.newDeposit)
    socket.on(`jackpot:${potId}:valueUpdate`, lobbyHandlers.valueUpdate)
    socket.on('jackpot:startTimer', lobbyHandlers.startTimer)
    socket.on('fairness:EOSBlock', lobbyHandlers.eosBlock)
    socket.on('jackpot:roll', lobbyHandlers.roll)
    socket.on('jackpot:lastHistory', lobbyHandlers.lastHistory)
    socket.on('jackpot:luckiest', lobbyHandlers.luckiest)

    if (socket.connected) {
      runLobbySubscribe()
    }

    return socket
  }

  const disconnect = () => {
    if (!socket || !lobbyHandlers) return
    const s = socket
    const h = lobbyHandlers
    s.off('connect', h.connect)
    s.off('jackpot:subscribe', h.jackpotSubscribe)
    s.off('connect_error', h.connectError)
    s.off('jackpot:newDeposit', h.newDeposit)
    s.off(`jackpot:${potId}:valueUpdate`, h.valueUpdate)
    s.off('jackpot:startTimer', h.startTimer)
    s.off('fairness:EOSBlock', h.eosBlock)
    s.off('jackpot:roll', h.roll)
    s.off('jackpot:lastHistory', h.lastHistory)
    s.off('jackpot:luckiest', h.luckiest)
    socket = null
    lobbyHandlers = null
  }

  const getSocket = () => socket

  return { connect, disconnect, getSocket }
}
