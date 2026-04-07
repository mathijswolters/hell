<template>
  <div
    class="relative w-full max-w-[1500px] 2xl:w-[800px] max-h-[93vh] 2xl:h-auto flex flex-col bg-[#420101] backdrop-blur-[200px] border border-[#530000]"
  >
    <!-- HEADER -->
    <div
      class="flex items-center justify-between px-4 h-[56px] border-b border-[hsl(0,98%,19%)]"
    >
      <span class="font-Rubik font-bold text-white text-base"> Show Tickets </span>

      <XMarkIcon
        class="w-6 h-6 cursor-pointer fill-[#d7b7b7] hover:scale-110 transition-transform"
        @click="closeModal()"
      />
    </div>

    <!-- BODY (SCROLLS) -->
    <div class="flex flex-col gap-2 overflow-y-auto p-[8px]">

      <div class="chat-list-item sm:min-w-[420px]">
        <div class="info-time-row">
          <div class="info-row">
            <img src="/img/icons/clever-boy.png" alt="img" />
            <span class="name">BreadYoutube2</span>
          </div>
          <div class="info-time">10 seconds ago</div>
        </div>
        <p class="message">Hello, how can I help you today?</p>
        <div class="admin-badge">
          <div class="circle-count">1</div>
        </div>
      </div>
      <div class="chat-list-item sm:min-w-[420px]">
        <div class="info-time-row">
          <div class="info-row">
            <img src="/img/icons/clever-boy.png" alt="img" />
            <span class="name">BreadYoutube2</span>
          </div>
          <div class="info-time">10 seconds ago</div>
        </div>
        <p class="message">Hello, how can I help you today?</p>
        <div class="admin-badge">
          <div class="circle-count">1</div>
        </div>
      </div>
      <div class="chat-list-item sm:min-w-[420px]">
        <div class="info-time-row">
          <div class="info-row">
            <img src="/img/icons/clever-boy.png" alt="img" />
            <span class="name">BreadYoutube2</span>
          </div>
          <div class="info-time">10 seconds ago</div>
        </div>
        <p class="message">Hello, how can I help you today?</p>
        <div class="admin-badge">
          <div class="circle-count">1</div>
        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div
      class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 border-t border-[hsl(0,98%,19%)]"
    >
      <!-- PAGINATION -->
      <div class="flex items-center justify-between w-full gap-3">
        <button
          :disabled="current_page === 1"
          @click="changePage(current_page - 1)"
          class="flex items-center gap-1 text-xs text-[#D7B7B7] disabled:opacity-50"
        >
          <ChevronDoubleLeftIcon class="w-4" />
          Previous Page
        </button>

        <div class="flex gap-2">
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="changePage(page)"
            class="font-Rubik font-bold text-sm"
            :class="page === current_page ? 'text-white' : 'text-[#D7B7B7]'"
          >
            {{ page }}
          </button>
        </div>

        <button
          :disabled="current_page === totalPages"
          @click="changePage(current_page + 1)"
          class="flex items-center gap-1 text-xs text-[#D7B7B7] disabled:opacity-50"
        >
          Next Page
          <ChevronDoubleRightIcon class="w-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  XMarkIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/vue/24/solid";
export default {
  data() {
    return {
      numb: 20,
      selectedOption: "all",

      searchQuery: "",
      dropdown: null,

      rows_dropdown: false,
      rows_per_page: 10,
      current_page: 1,
      rows_options: [10, 20, 30],
      maxVisiblePages: 5,
      //   user_in_page: false

      options: [
        { label: "ALL", value: "all" },
        { label: "COINFLIP", value: "coinflip" },
        { label: "JACKPOT", value: "jackpot" },
        { label: "TOURNAMENT", value: "tournament" },
      ],
      history: [
        {
          type: "coinflip",
          _id: 3,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-16T17:05",
          state: "in_progress",
        },
        {
          type: "coinflip",
          _id: 32,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
              win: true,
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-16T18:05",
          state: "completed",
        },
        {
          type: "coinflip",
          _id: 325,
          players: [
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-16T18:28",
          state: "canceled",
        },
        {
          type: "coinflip",
          _id: 6,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "flipping",
        },
        {
          type: "jackpot",
          _id: 7,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "in_progress",
        },
        {
          type: "jackpot",
          _id: 8,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "completed",
        },
        {
          type: "jackpot",
          _id: 9,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "canceled",
        },
        {
          type: "jackpot",
          _id: 10,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "spinning",
        },
        {
          type: "jackpot",
          _id: 8,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "completed",
        },
        {
          type: "jackpot",
          _id: 9,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "tester hell",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "canceled",
        },
        {
          type: "jackpot",
          _id: 10,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "qusai",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "spinning",
        },
        {
          type: "tournament",
          _id: 33,
          players: [
            {
              name: "tester heaven",
              avatar:
                "https://i.pinimg.com/236x/05/41/59/054159cb16d09475bc6eba72e41699e4.jpg",
              coin: "heaven",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 300,
                  id: 1,
                },
              ],
            },
            {
              name: "qusai",
              avatar: "https://images3.alphacoders.com/132/1320540.png",
              coin: "hell",
              items: [
                {
                  name: "AK-47",
                  image:
                    "https://community.fastly.steamstatic.com/economy/image/6TMcQ7eX6E0EZl2byXi7vaVKyDk_zQLX05x6eLCFM9neAckxGDf7qU2e2gu64OnAeQ7835Ff5GLNfDY0jhyo8DEiv5dbPK47pbcyR_m4lcnvtWQ/360fx360f",
                  price: 59,
                  id: 1,
                },
              ],
            },
          ],

          date: "2024-12-01T17:05",
          state: "flipping",
        },
      ],
    };
  },
  methods: {
    searchedPlayer(item) {
      const query = this.searchQuery.toLowerCase();
      return (
        item.players.find((player) =>
          player.name.toLowerCase().includes(query.toLowerCase())
        ) || null
      );
    },
    closeModal() {
      this.$emit("close-modal");
    },
    toggleTab(text) {
      this.tab = text;
      this.current_page = 1;
    },
    toggleDropdown(name) {
      this.dropdown = this.dropdown === name ? null : name;
    },
    handleClickOutside(event) {
      const dropdownElement = this.$refs.dropdownContainer;
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        this.dropdown = null;
      }
    },
    formatDateTime(dateString) {
      const now = new Date();
      const targetDate = new Date(dateString);
      const diffInSeconds = Math.floor((now - targetDate) / 1000);

      // Conditions for relative time
      if (diffInSeconds < 60) {
        return "a minute ago";
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
      } else if (diffInSeconds < 172800) {
        return "a day ago";
      }

      // Fallback: Format fixed date for older entries
      return targetDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.current_page = page;
      }
    },
    calculateTotal(players) {
      let value = 0;
      players.forEach((player) => {
        player.items.forEach((item) => {
          value += item.price;
        });
      });
      return value;
    },
    updatePagination() {
      this.current_page = 1;
    },
  },
  mounted() {
    document.addEventListener("mousedown", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  },
  components: {
    XMarkIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
  },
  computed: {
    filteredHistory() {
      let arr = [];
      if (this.selectedOption == "all") {
        arr = this.history;
      } else if (this.selectedOption == "jackpot") {
        this.history.forEach((item) => {
          if (item.type == "jackpot") {
            arr.push(item);
          }
        });
      } else if (this.selectedOption == "coinflip") {
        this.history.forEach((item) => {
          if (item.type == "coinflip") {
            arr.push(item);
          }
        });
      } else if (this.selectedOption == "tournament") {
        this.history.forEach((item) => {
          if (item.type == "tournament") {
            arr.push(item);
          }
        });
      }
      return arr;
    },
    searchFilteredHistory() {
      if (!this.searchQuery) return this.filteredHistory;

      const query = this.searchQuery.toLowerCase();

      return this.filteredHistory.filter((entry) => {
        const matchGameId = entry._id.toString().includes(query);

        const matchPlayers = entry.players.some((player) =>
          player.name.toLowerCase().includes(query)
        );

        return matchGameId || matchPlayers;
      });
    },
    totalPages() {
      return Math.ceil(this.filteredHistory.length / this.rows_per_page);
    },
    paginatedData() {
      const start = (this.current_page - 1) * this.rows_per_page;
      const end = start + this.rows_per_page;
      return this.filteredHistory.slice(start, end);
    },
    visiblePages() {
      const half = Math.floor(this.maxVisiblePages / 2);
      let start = Math.max(1, this.current_page - half);
      let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

      // Adjust start if we're near the end
      if (end - start < this.maxVisiblePages - 1) {
        start = Math.max(1, end - this.maxVisiblePages + 1);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
};
</script>
<style scoped>
.chat-list-item {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  background-color: #620101;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: "rubik";
}

.chat-list-item .ticket-badge {
  background-color: #420101;
  border-radius: 6px;
  padding: 4px 6px;
  font-size: 9px;
  color: white;
}
.chat-list-item .admin-badge {
  width: max-content;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
  color: #ff3435;
  position: absolute;
  bottom: 12px;
  right: 12px;
}

.circle-count {
  width: 20px;
  height: 20px;
  border: 1px solid #ff3435;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #420101;
  font-size: 14px;
  font-weight: 500;
  color: #ff3435;
}
.info-time-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}
.info-row {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}
.info-row img {
  width: 24px;
  height: 24px;
  border-radius: 2px;
}
.info-row span {
  font-size: 14px;
  font-weight: 700;
  color: white;
}
.info-time {
  width: max-content;
  text-align: end;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 500;
  color: white;
  opacity: 0.5;
}
p.message {
  font-size: 14px;
  font-weight: 500;
  color: white;
  opacity: 0.5;
  padding-left: 30px;
}
/* Pagination */
::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
  height: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: #d10d0d;
  border-radius: 4px;
}

.radio input {
  position: absolute;
  opacity: 0; /* Hide the default radio button */
  cursor: pointer;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  background-color: transparent;
  border: 2px solid #ff3435;
}

.checkmark::after {
  content: "";
  position: absolute;
  /* display: none; */
  opacity: 0;
  left: 3px;
  top: -2px;
  height: 14px;
  width: 16px;
  /* width: 5px;
  height: 10px; */
  /* border: solid white; */
  /* border-width: 0 2px 2px 0;
  transform: rotate(45deg); */
  z-index: 2;
  background-image: url(../assets/img/tick.png);
  background-size: contain;
  transition: opacity ease-in-out 100ms;
}

.radio input:checked ~ .checkmark::after {
  /* display: block; */
  opacity: 1;
}
.search ::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
}
.search ::-webkit-scrollbar-track {
  background: #d10d0d;
}
.search ::-webkit-scrollbar-thumb {
  /* width: 2rem; */

  background: #ff3435;
  border-radius: 4px;
}
</style>
