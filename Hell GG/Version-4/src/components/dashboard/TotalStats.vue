<template>
  <div class="stats-container">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 lg:gap-5 gap-3 w-full">
      <div class="total-card">
        <img src="/public/img/icons/shop.png" alt="shop" />
        <h2>Total $ on shop</h2>
        <div class="card-count">
          <img src="/public/img/dollarCoin.png" alt="dollar" />
          <h2>129,321,921</h2>
        </div>
      </div>
      <div class="total-card">
        <img src="/public/img/icons/logs.svg" alt="wallet" />
        <h2>Total $ on users</h2>
        <div class="card-count">
          <img src="/public/img/dollarCoin.png" alt="dollar" />
          <h2>52.912,122</h2>
        </div>
      </div>
      <div class="total-card">
        <img src="/public/img/icons/register.png" alt="register" />
        <h2>Total users Registered</h2>
        <div class="card-count">
          <h2>10,921</h2>
        </div>
      </div>
      <div class="total-card">
        <img src="/public/img/icons/affiliate.svg" alt="affiliate" />
        <h2>Total Affiliates gained</h2>
        <div class="card-count">
          <img src="/public/img/dollarCoin.png" alt="dollar" />
          <h2>300,928</h2>
        </div>
      </div>
      <div class="total-card">
        <img src="/public/img/icons/reward.svg" alt="reward" />
        <h2>Total Rewards Gained</h2>
        <div class="card-count">
          <img src="/public/img/dollarCoin.png" alt="dollar" />
          <h2>15,923</h2>
        </div>
      </div>
      <div class="total-card">
        <img src="/public/img/icons/withdraw.svg" alt="withdraw" />
        <h2>Total Withdraws</h2>
        <div class="card-count">
          <img src="/public/img/dollarCoin.png" alt="dollar" />
          <h2>10,923,82</h2>
        </div>
      </div>
      <div class="total-card">
        <img src="/public/img/icons/request.png" alt="request" />
        <h2>Open Shop requests</h2>
        <div class="card-count">
          <h2>23</h2>
        </div>
      </div>
      <div class="total-card">
        <img src="/public/img/icons/steam.svg" alt="steam" />
        <h2>Steam Status</h2>
        <div class="card-count">
          <h2><div class="status-green">ON</div></h2>
        </div>
      </div>
    </div>
    <div
      class="w-full flex justify-center flex-wrap items-center gap-3 md:my-[40px] my-[30px]"
    >
      <button class="stat-btn active">1 Day Stats</button>
      <button class="stat-btn">1 Week Stats</button>
      <button class="stat-btn">1 Month Stats</button>
      <div
        class="flex items-center justify-center w-[50px] md:h-12 h-9 relative"
        ref="dropdownContainer"
      >
        <button
          class="h-full w-full text-center bg-[rgba(254,189,17,1)] text-white rounded-sm font-Rubik font-bold text-base flex items-center justify-center gap-x-1 outline-none"
          @click="
            active_dropdown == 'date'
              ? (active_dropdown = null)
              : (active_dropdown = 'date')
          "
        >
          <CalendarIcon class="w-[22px] stroke-white transition-all" />
          <ChevronDownIcon
            class="w-3 stroke-white transition-all"
            :class="{
              '-rotate-180': active_dropdown == 'date',
              'z-20': active_dropdown != 'date',
            }"
          />
        </button>
        <div
          class="absolute bg-[#420101] rounded-md border border-solid border-[#620101] right-0 transition-all flex items-center justify-center"
          :class="{
            'w-0 h-0 opacity-0 top-0  mt-0 -z-10': active_dropdown != 'date',
            'md:w-[387px] w-[300px] h-[345px] opacity-100 top-full mt-1.5 z-10':
              active_dropdown == 'date',
          }"
        >
          <DatePicker
            :class="{
              'opacity-0': active_dropdown != 'date',
              'opacity-100 transition-opacity duration-500': active_dropdown == 'date',
            }"
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-4 w-full">
      <h2 class="text-[18px] font-[800] font-[rubik] text-white">JACKPOT</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 w-full mb-3">
        <div class="stat-card">
          <img src="/public/img/icons/jackpot.svg" alt="jackpot" />
          <div>
            <h2>22</h2>
            <h2 class="opacity-[0.5]">Unique Users</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/jackpot.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>34,422</h2>
            <h2 class="opacity-[0.5]">Skin Wagered</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/jackpot.svg" alt="jackpot" />
          <div>
            <h2><span>$</span>555</h2>
            <h2 class="opacity-[0.5]">Store Wagered</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/jackpot.svg" alt="jackpot" />
          <div>
            <h2>34</h2>
            <h2 class="opacity-[0.5]">Raked</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/jackpot.svg" alt="jackpot" />
          <div>
            <h2>13%</h2>
            <h2 class="opacity-[0.5]">Average % Taxed</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/jackpot.svg" alt="jackpot" />
          <div>
            <h2>10,923</h2>
            <h2 class="opacity-[0.5]">Games Played</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/jackpot.svg" alt="jackpot" />
          <div>
            <h2>3,212</h2>
            <h2 class="opacity-[0.5]">Untaxed Games</h2>
          </div>
        </div>
      </div>
      <h2 class="text-[18px] font-[800] font-[rubik] text-white">COINFLIP</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 w-full mb-3">
        <div class="stat-card">
          <img src="/public/img/icons/coinflip.svg" alt="coinflip" />
          <div>
            <h2>22</h2>
            <h2 class="opacity-[0.5]">Unique Users</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/coinflip.svg" alt="coinflip" />
          <div>
            <h2><span>$</span>34,422</h2>
            <h2 class="opacity-[0.5]">Skin Wagered</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/coinflip.svg" alt="coinflip" />
          <div>
            <h2><span>$</span>555</h2>
            <h2 class="opacity-[0.5]">Store Wagered</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/coinflip.svg" alt="coinflip" />
          <div>
            <h2>34</h2>
            <h2 class="opacity-[0.5]">Raked</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/coinflip.svg" alt="coinflip" />
          <div>
            <h2>13%</h2>
            <h2 class="opacity-[0.5]">Average % Taxed</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/coinflip.svg" alt="coinflip" />
          <div>
            <h2>10,923</h2>
            <h2 class="opacity-[0.5]">Games Played</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/dollarCoin.png" alt="dollar" />
          <div>
            <h2>3,212</h2>
            <h2 class="opacity-[0.5]">Untaxed Games</h2>
          </div>
        </div>
      </div>
      <h2 class="text-[18px] font-[800] font-[rubik] text-white">WITHDRAWS</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 w-full mb-3">
        <div class="stat-card">
          <img src="/public/img/icons/withdraw.png" alt="withdraw" />
          <div>
            <h2>24</h2>
            <h2 class="opacity-[0.5]">Unique Users</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/withdraw.png" alt="withdraw" />
          <div>
            <h2>10,923</h2>
            <h2 class="opacity-[0.5]">Total Withdrawn</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/withdraw.png" alt="withdraw" />
          <div>
            <h2>3,212</h2>
            <h2 class="opacity-[0.5]">Total Withdraws</h2>
          </div>
        </div>
      </div>
      <h2 class="text-[18px] font-[800] font-[rubik] text-white">AFFILIATES</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 w-full mb-3">
        <div class="stat-card">
          <img src="/public/img/icons/affiliate.png" alt="affiliate" />
          <div>
            <h2>1</h2>
            <h2 class="opacity-[0.5]">Paid Out</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/affiliate.png" alt="affiliate" />
          <div>
            <h2>10</h2>
            <h2 class="opacity-[0.5]">Claimed</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/affiliate.png" alt="affiliate" />
          <div>
            <h2>1</h2>
            <h2 class="opacity-[0.5]">Affiliates Awarded</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/affiliate.png" alt="affiliate" />
          <div>
            <h2>21</h2>
            <h2 class="opacity-[0.5]">Users Paid To Affiliates</h2>
          </div>
        </div>
      </div>
      <h2 class="text-[18px] font-[800] font-[rubik] text-white">REWARDS</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 w-full mb-3">
        <div class="stat-card">
          <img src="/public/img/icons/reward.png" alt="reward" />
          <div>
            <h2>1</h2>
            <h2 class="opacity-[0.5]">Paid Out</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/reward.png" alt="reward" />
          <div>
            <h2>1</h2>
            <h2 class="opacity-[0.5]">To People</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/reward.png" alt="reward" />
          <div>
            <h2>1</h2>
            <h2 class="opacity-[0.5]">With Rewards Claimed</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/reward.png" alt="reward" />
          <div>
            <h2>1</h2>
            <h2 class="opacity-[0.5]">Faucet Payouts</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/reward.png" alt="reward" />
          <div>
            <h2>1</h2>
            <h2 class="opacity-[0.5]">Affiliate Code Payouts</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/reward.png" alt="reward" />
          <div>
            <h2>1</h2>
            <h2 class="opacity-[0.5]">Promocode Payouts</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/reward.png" alt="reward" />
          <div>
            <h2>1</h2>
            <h2 class="opacity-[0.5]">Level Case Payouts</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/reward.png" alt="reward" />
          <div>
            <h2>1</h2>
            <h2 class="opacity-[0.5]">Gift Payouts</h2>
          </div>
        </div>
      </div>
      <h2 class="text-[18px] font-[800] font-[rubik] text-white">BALANCES</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3 w-full mb-3">
        <div class="stat-card">
          <img src="/public/img/icons/balance.png" alt="balance" />
          <div>
            <h2><span>$</span>24</h2>
            <h2 class="opacity-[0.5]">Coinflip Bot</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/balance.png" alt="balance" />
          <div>
            <h2><span>$</span>10,923</h2>
            <h2 class="opacity-[0.5]">Jackpot Bot</h2>
          </div>
        </div>
        <div class="stat-card">
          <img src="/public/img/icons/balance.png" alt="balance" />
          <div>
            <h2><span>$</span>3,212</h2>
            <h2 class="opacity-[0.5]">Contact Bot</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CalendarIcon, ChevronDownIcon } from "@heroicons/vue/24/solid";
import DatePicker from "@/components/DatePicker.vue";

export default {
  name: "TotalStats",
  components: {
    ChevronDownIcon,
    CalendarIcon,
    DatePicker,
  },
  data() {
    return {
      active_dropdown: null,
    };
  },
  methods: {},
};
</script>
<style scoped>
.stats-container {
  width: 100%;
  margin-bottom: 20px;
  background: transparent;
  font-family: "rubik";
}
.total-card {
  background-color: #620101;
  padding: 11px 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 6px;
  align-items: center;
  text-align: center;
}

.total-card h2 {
  font-size: 10px;
  text-transform: uppercase;
  color: white;
  font-weight: 800;
}
.total-card .status-green {
  white-space: nowrap;
  font-size: 10px;
  text-transform: uppercase;
  color: #04ab53;
  font-weight: 800;
}

.total-card img {
  width: 13px;
  height: 13px;
}

.total-card .card-count {
  background-color: #420101;
  padding: 6px 4px;
  width: 100%;
  margin-top: 3px;
  display: flex;
  justify-content: center;
  gap: 4px;
  align-items: center;
}
.stat-btn {
  border: 0.5px solid #ff3435;
  padding: 12px;
  background: #620101;
  border-radius: 2px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: max-content;
  font-size: 14px;
  font-weight: 500;
  color: white;
}
.stat-btn.active {
  background: #ff3435;
}
@media (max-width: 767px) {
  .stat-btn {
    padding: 8px;
    font-size: 12px;
  }
}
</style>
