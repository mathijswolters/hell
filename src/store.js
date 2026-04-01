// store.js
import { createStore } from 'vuex'

export const store = createStore({
  state: {
    battles: [
      {
        _id: 1,
        players: [
          {
            name: 'tester heaven',
            avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
            coin: 'heaven',
            items: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 1,
                id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 2
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 20,
                id: 3
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 56,
                id: 4
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 900,
                id: 5
              }
            ]
          }
        ],

        total: 1077,
        state: 'created'
      },
      {
        _id: 2,
        double_down: [
          {
            _id: 5,
            players: [
              {
                name: 'tester hell',
                avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                coin: 'heaven',
                win: true,
                items: [
                  {
                    name: 'AK-47',
                    image:
                      'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                    price: 100,
                    id: 1
                  },
                  {
                    name: 'AK-47',
                    image:
                      'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                    price: 100,
                    id: 1
                  },
                  {
                    name: 'AK-47',
                    image:
                      'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                    price: 100,
                    id: 1
                  },
                  {
                    name: 'AK-47',
                    image:
                      'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                    price: 100,
                    id: 1
                  },
                  {
                    name: 'AK-47',
                    image:
                      'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                    price: 100,
                    id: 1
                  },
                  {
                    name: 'AK-47',
                    image:
                      'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                    price: 100,
                    id: 1
                  },
                  {
                    name: 'AK-47',
                    image:
                      'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                    price: 24,
                    id: 1
                  }
                ]
              },
              {
                name: 'tester heaven',
                avatar: 'https://images3.alphacoders.com/132/1320540.png',
                coin: 'hell',
                win: false,
                items: [
                  {
                    name: 'AK-47 testing name length',
                    image:
                      'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                    price: 100,
                    id: 1
                  }
                ]
              }
            ],

            total: 245,
            state: 'finished'
          },
          {
            _id: 6,
            players: [
              {
                name: 'tester hell',
                avatar: 'https://images3.alphacoders.com/132/1320540.png',
                coin: 'hell',
                win: true,
                items: [
                  {
                    name: 'AK-47',
                    image:
                      'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                    price: 100,
                    id: 1
                  }
                ]
              },
              {
                name: 'tester heaven',
                avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
                coin: 'heaven',
                win: false,
                items: [
                  {
                    name: 'AK-47',
                    image:
                      'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                    price: 100,
                    id: 1
                  }
                ]
              }
            ],

            total: 245,
            state: 'finished'
          }
        ],
        players: [
          {
            name: 'tester heaven',
            avatar: 'https://images3.alphacoders.com/132/1320540.png',
            coin: 'hell',
            items: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 20,
                id: 1
              }
            ]
          }
        ],

        total: 245,
        state: 'created'
      },

      {
        _id: 3,
        players: [
          {
            name: 'tester heaven',
            avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
            coin: 'heaven',
            win_streak: 1,
            dominating: 1,
            target: 0,
            items: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 300,
                id: 1
              }
            ]
          },
          {
            name: 'tester hell',
            avatar: 'https://images3.alphacoders.com/132/1320540.png',
            coin: 'hell',
            win_streak: 1,
            dominating: 1,
            target: 1,
            items: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 59,
                id: 1
              }
            ]
          }
        ],

        total: 245,
        state: 'in_progress'
      },
      {
        _id: 4,
        players: [
          {
            name: 'tester hell',
            avatar: 'https://images3.alphacoders.com/132/1320540.png',
            coin: 'hell',
            items: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 1
              }
            ]
          },
          {
            name: 'tester heaven',
            avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
            coin: 'heaven',
            items: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 1
              }
            ]
          }
        ],
        total: 245,
        state: 'in_progress'
      },
      {
        _id: 5,
        players: [
          {
            name: 'tester hell',
            avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
            coin: 'heaven',
            win: false,
            items: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 1
              },
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 24,
                id: 1
              }
            ]
          },
          {
            name: 'tester heaven',
            avatar: 'https://images3.alphacoders.com/132/1320540.png',
            coin: 'hell',
            win: true,
            items: [
              {
                name: 'AK-47 testing name length',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 1
              }
            ]
          }
        ],

        total: 245,
        state: 'finished'
      },
      {
        _id: 6,
        players: [
          {
            name: 'tester hell',
            avatar: 'https://images3.alphacoders.com/132/1320540.png',
            coin: 'hell',
            win: false,
            items: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 1
              }
            ]
          },
          {
            name: 'tester heaven',
            avatar: 'https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg',
            coin: 'heaven',
            win: true,
            items: [
              {
                name: 'AK-47',
                image:
                  'https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f',
                price: 100,
                id: 1
              }
            ]
          }
        ],

        total: 245,
        state: 'finished'
      }
    ],
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
