<template>
    <div class="w-full h-[99px] bg-[#5f0303] relative">
      <!-- Profile Image -->
      <div class="absolute left-0 top-[10px] w-10 h-10 rounded-[2.5px] overflow-hidden">
        <img 
          :src="`https://placehold.co/40x40/5f0303/ffffff?text=${username.charAt(0)}`" 
          :alt="username"
          class="w-full h-full object-cover"
        />
      </div>
  
      <!-- Username -->
      <div class="absolute left-[50px] top-[10px]">
        <h2 class="text-white font-rubik font-extrabold text-sm leading-5">{{ username }}</h2>
      </div>
  
      <!-- Win Details -->
      <div class="absolute left-[50px] top-[32px]">
        <p class="text-white font-sans text-xs leading-[18px]">WON ${{ amount.toFixed(2) }} with a {{ chance }}% Chance</p>
      </div>
  
      <!-- Divider -->
      <div class="absolute left-0 top-[59px] w-[304px] h-[1px] bg-[#ff3435] opacity-20"></div>
  
      <!-- Ticket -->
      <div class="absolute left-0 top-[71px]">
        <p class="text-white font-rubik font-medium text-xs leading-[18px]">Ticket: {{ ticket }}</p>
      </div>
  
      <!-- View Link -->
      <div class="absolute right-0 top-[71px]">
        <button class="text-[#d7b7b7] font-rubik font-semibold text-xs leading-[18px] text-right hover:opacity-80 transition-opacity">
          view
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    username: {
      type: String,
      required: true
    },
    ticket: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    chance: {
      type: Number,
      required: true
    }
  })
  </script>