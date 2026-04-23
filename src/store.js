// store.js
import { createStore } from 'vuex'

function coinflipToNumber(value, fallback = 0) {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

function mapCoinflipItemForBattle(item, index = 0) {
  if (!item || typeof item !== 'object') return null
  const rawImage = item.image ?? item.icon_url ?? item.icon ?? ''
  return {
    _id: item._id ?? item.id ?? item.assetid ?? item.asset_id ?? index,
    id: item.id ?? item._id ?? index,
    name: item.name ?? item.market_hash_name ?? 'Item',
    image: rawImage,
    price: coinflipToNumber(item.price ?? item.value ?? item.amount ?? 0, 0)
  }
}

function sumItemPrices(items) {
  if (!Array.isArray(items)) return 0
  return items.reduce((s, it) => s + coinflipToNumber(it?.price, 0), 0)
}

/** Lobby row player shape (name, avatar, coin, win?, items, _id, steamid). */
function mapRawPlayerToBattlePlayer(raw, index, gameId) {
  if (!raw || typeof raw !== 'object') return null
  const items = (Array.isArray(raw.items) ? raw.items : [])
    .map((it, i) => mapCoinflipItemForBattle(it, i))
    .filter(Boolean)
  const steamid = raw.steamid ?? raw.steam_id ?? null
  const _id = raw._id ?? steamid ?? `${String(gameId)}-p${index}`
  const valueFromItems = sumItemPrices(items)
  const value = coinflipToNumber(raw.value, valueFromItems) || valueFromItems
  const ch = coinflipToNumber(raw.chance, NaN)
  const row = {
    _id,
    steamid,
    name: raw.name ?? 'Unknown',
    avatar: raw.avatar ?? '/img/user/userImage.png',
    coin: raw.coin,
    chance: Number.isFinite(ch) ? ch : 50,
    value,
    items
  }
  console.log('here is row in mapRawPlayerToBattlePlayer: ', row)
  return row
}

/**
 * Keep top-level host/part fields in sync with `players[]` (API often sends only players).
 * Merges onto existing `battle`/`game`-style host_data so socket extras are preserved.
 */
export function hostPartFieldsFromPlayers(players, ctx = {}) {
  const out = {}
  if (!Array.isArray(players) || players.length === 0) return out
  const p0 = players[0]
  const hostSteam = p0.steamid ?? p0._id ?? ctx.host ?? null
  out.host = ctx.host != null && ctx.host !== '' ? ctx.host : hostSteam
  out.host_data = {
    ...(ctx.host_data && typeof ctx.host_data === 'object' ? ctx.host_data : {}),
    name: p0.name,
    avatar: p0.avatar,
    coin: p0.coin,
    ...(hostSteam != null && hostSteam !== '' ? { steamid: hostSteam } : {}),
    chance: p0.chance != null ? coinflipToNumber(p0.chance, 50) : 50,
    value: coinflipToNumber(p0.value, sumItemPrices(p0.items))
  }
  out.host_skins = Array.isArray(p0.items) ? p0.items : []

  if (players.length >= 2) {
    const p1 = players[1]
    const partSteam = p1.steamid ?? p1._id ?? ctx.part ?? null
    out.part = ctx.part != null && ctx.part !== '' ? ctx.part : partSteam
    out.part_data = {
      ...(ctx.part_data && typeof ctx.part_data === 'object' ? ctx.part_data : {}),
      name: p1.name,
      avatar: p1.avatar,
      coin: p1.coin,
      ...(partSteam != null && partSteam !== '' ? { steamid: partSteam } : {}),
      chance: p1.chance != null ? coinflipToNumber(p1.chance, 50) : 50,
      value: coinflipToNumber(p1.value, sumItemPrices(p1.items))
    }
    out.part_skins = Array.isArray(p1.items) ? p1.items : []
  } else if (ctx.part != null && ctx.part !== '') {
    out.part = ctx.part
    if (ctx.part_data && typeof ctx.part_data === 'object') {
      out.part_data = { ...ctx.part_data }
    }
    if (Array.isArray(ctx.part_skins)) {
      out.part_skins = ctx.part_skins
    }
  }
  return out
}

/**
 * Coinflip lifecycle from server (and legacy aliases) → canonical:
 * `open` | `joining` | `joined` | `ending` | `ended`
 */
export function normalizeCoinflipLifecycleState(raw) {
  const s = String(raw ?? '')
    .trim()
    .toLowerCase()
  if (!s) return 'open'
  if (['ended', 'complete', 'cancelled', 'canceled', 'finished'].includes(s)) return 'ended'
  if (s === 'ending') return 'ending'
  if (['joined', 'in_progress', 'in-progress', 'active', 'rolling', 'flipping'].includes(s)) {
    return 'joined'
  }
  if (s === 'joining') return 'joining'
  if (['open', 'created', 'waiting', 'pending'].includes(s)) return 'open'
  return 'open'
}

/**
 * Turn a coinflip host/socket payload into a lobby `battle` row.
 * Supports either `players[]` (preferred) or legacy `host` / `host_data` / `host_skins` + `part` / …
 */
export function normalizeSocketGameToBattle(game, server_time) {
  if (!game || typeof game !== 'object') return null
  const id = game.gameid ?? game.gameId ?? game.game_id ?? game.id ?? game._id
  if (id == null || id === '') return null

  const idKey = Number.isFinite(Number(id)) ? Number(id) : id

  let players = []
  if (Array.isArray(game.players) && game.players.length > 0) {
    players = game.players.map((p, i) => mapRawPlayerToBattlePlayer(p, i, idKey)).filter(Boolean)
  } else {
    const hostData = game.host_data || game.hostData || {}
    const hostSkins = Array.isArray(game.host_skins)
      ? game.host_skins
      : Array.isArray(game.hostSkins)
        ? game.hostSkins
        : []
    const hostSteam = game.host ?? hostData.steamid ?? null
    const hostPlayer = mapRawPlayerToBattlePlayer(
      {
        _id: hostSteam ?? idKey,
        steamid: hostSteam,
        name: hostData.name,
        avatar: hostData.avatar,
        coin: hostData.coin,
        chance: hostData.chance,
        value: hostData.value ?? game.total_value,
        items: hostSkins
      },
      0,
      idKey
    )
    if (hostPlayer) players.push(hostPlayer)
    if (game.part_data && game.part) {
      const partSkins = Array.isArray(game.part_skins) ? game.part_skins : []
      const joiner = mapRawPlayerToBattlePlayer(
        {
          _id: game.part,
          steamid: game.part,
          name: game.part_data.name,
          avatar: game.part_data.avatar,
          coin: game.part_data.coin,
          chance: game.part_data.chance,
          value: game.part_data.value,
          items: partSkins
        },
        1,
        idKey
      )
      if (joiner) players.push(joiner)
    }
  }
  const total = coinflipToNumber(players[0].value, 0) + coinflipToNumber(players[1]?.value, 0)
  const status = game.state
  const joining = !!game.joining || status === 'joining'
  const base = {
    _id: idKey,
    gameid: idKey,
    hosted: game.hosted,
    joined: game.joined,
    server_time: server_time,
    players,
    total,
    total_value: coinflipToNumber(game.total_value ?? game.total ?? total, total),
    state: status,
    joining,
    attempts: Array.isArray(game.attempts) ? game.attempts : [],
    ...(game.createdAt != null ? { createdAt: game.createdAt } : {}),
    winner: game.winner,
    ticket: game.ticket,
    hash: game.hash,
    block: game.block,
    coin: game.coin,
    roll: game.roll
  }

  const hostPart = hostPartFieldsFromPlayers(players, {
    host: game.host,
    part: game.part,
    host_data: game.host_data || game.hostData,
    part_data: game.part_data
  })

  return { ...base, ...hostPart }
}

function battleIdMatches(battle, battleId) {
  if (battle == null || battleId == null) return false
  const bid = String(battleId)
  for (const key of ['_id', 'gameid', 'gameId', 'id']) {
    const v = battle[key]
    if (v != null && String(v) === bid) return true
  }
  return false
}

/** `Object.assign` copies `undefined` and wipes existing keys — drop those entries before merge. */
function omitUndefinedEntries(obj) {
  if (!obj || typeof obj !== 'object') return {}
  const out = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v
  }
  return out
}

export const store = createStore({
  state: {
    server_time: null,
    battles: [],
    coinFlipFilters: {
      sort: 'highest amount first',
      personalCoinFlips: false,
      completedToBottom: false,
      time: 2
    },
    /** Latest pot total for NavBar; updated via `jackpot:${potid}:valueUpdate` (global io.emit). */
    jackpotNavTotal: null
  },
  mutations: {
    setServerTime(state, value) {
      state.server_time = value
    },
    setJackpotNavTotal(state, value) {
      const n = Number(value)
      if (Number.isFinite(n)) state.jackpotNavTotal = n
    },
    // Coinflip battle mutations
    // Mutation to update the battle state (for example, from 'started' to 'completed')
    updateBattleState(state, { battleId, newState }) {
      const battle = state.battles.find((battle) => battle._id === battleId)
      if (battle) {
        battle.state = newState // Update the state of the battle
      }
    },
    updatePlayerResult(state, { battleId, playerIndex, result }) {
      const battle = state.battles.find((battle) => battle._id === battleId)
      if (battle) {
        // Force reactivity with Object.assign
        Object.assign(battle.players[playerIndex], { win: result })
      }
    },
    // Mutation to update the entire battle data (e.g., after the coin flip results)
    updateBattle(state, { battleId, updatedBattle }) {
      const index = state.battles.findIndex((battle) => battle._id === battleId)
      console.log('here is index in updateBattle: ', index, updatedBattle)
      if (index !== -1) {
        state.battles[index] = updatedBattle // Replace the battle object with updated data
      }
    },
    removeBattle(state, battleId) {
      state.battles = state.battles.filter((battle) => battle._id !== battleId)
    },

    // Coinflip filter mutation
    updateCoinFlipFiltersProperty(state, { key, value }) {
      state.coinFlipFilters[key] = value // Add or update a property in the object
    },

    upsertCoinflipGame(state, rawGame) {
      const normalized = normalizeSocketGameToBattle(rawGame, state.server_time)
      if (!normalized) return
      const idx = state.battles.findIndex((b) => battleIdMatches(b, normalized._id))
      if (idx === -1) {
        state.battles.push(normalized)
      } else {
        state.battles[idx] = normalized
      }
    },

    patchBattleById(state, { battleId, patch }) {
      if (battleId == null || !patch || typeof patch !== 'object') return
      console.log('here is patch in patchBattleById: ', patch)
      const battle = state.battles.find((b) => battleIdMatches(b, battleId))

      if (!battle) return
      const rest = { ...patch }
      if (patch.host_data && typeof patch.host_data === 'object') {
        battle.host_data = { ...(battle.host_data || {}), ...patch.host_data }
        delete rest.host_data
      }
      Object.assign(battle, omitUndefinedEntries(rest))
      if (patch.state != null) {
        battle.state = patch.state
      }
      if (Array.isArray(battle.players) && battle.players.length > 0) {
        Object.assign(battle, hostPartFieldsFromPlayers(battle.players, battle))
      }
    }
  },
  actions: {
    // Coinflip battle actions
    updateBattleState({ commit }, { battleId, newState }) {
      commit('updateBattleState', { battleId, newState })
    },
    updatePlayerResult({ commit }, { battleId, playerIndex, result }) {
      commit('updatePlayerResult', { battleId, playerIndex, result })
    },
    updateBattle({ commit }, { battleId, updatedBattle }) {
      commit('updateBattle', { battleId, updatedBattle })
    },
    removeBattle({ commit }, battleId) {
      commit('removeBattle', battleId)
    },

    // Coinflip filters actions
    updateCoinFlipFiltersProperty({ commit }, { key, value }) {
      commit('updateCoinFlipFiltersProperty', { key, value })
    }
  },
  getters: {
    getBattles(state) {
      return state.battles
    },
    getCoinFlipFilters(state) {
      return state.coinFlipFilters
    }
  }
})
