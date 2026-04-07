<template>
  <div class="text-white w-[329.49px] mx-auto">
    <!-- Header: Month and Year Dropdowns -->
    <div class="flex justify-between items-center mb-2">
      <!-- Month Dropdown -->
      <select
        v-model="currentMonth"
        @change="generateCalendar"
        class="bg-[#620101] text-white rounded px-1 h-[40px] cursor-pointer outline-none"
      >
        <option v-for="(month, index) in months" :key="index" :value="index">
          {{ month }}
        </option>
      </select>

      <!-- Year Dropdown -->
      <select
        v-model="currentYear"
        @change="generateCalendar"
        class="bg-transparent h-[40px] text-white rounded px-2 py-1 outline-none"
      >
        <option v-for="year in years" :key="year" :value="year" class="bg-[#620101]">
          {{ year }}
        </option>
      </select>
    </div>

    <!-- Days of the Week -->
    <div class="grid grid-cols-7 text-center text-white">
      <div v-for="day in daysOfWeek" :key="day" class="text-sm font-semibold font-Rubik">
        {{ day }}
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-7 gap-y-0.5 text-center h-[216px]">
      <div
        v-for="(date, index) in calendarDays"
        :key="index"
        class="relative flex justify-center items-center h-9"
      >
        <!-- Range Background -->
        <div
          v-if="isInRange(date.day) && date.type != 'next' && date.type != 'prev'"
          class="absolute bg-[#620101] h-full w-full"
          :class="rangeBackgroundStyle(date.day)"
        ></div>

        <!-- Selected Start/End Circle -->
        <div
          v-if="
            isSelected(date.day) &&
            fromDate &&
            toDate &&
            fromDate != toDate &&
            date.type != 'next' &&
            date.type != 'prev'
          "
          class="absolute bg-[#620101] w-[42.2px] h-9 flex items-center"
          :class="{
            'rounded-l-full right-0': formatDate(date.day) === fromDate && toDate,
            'rounded-r-full left-0': formatDate(date.day) === toDate && fromDate
          }"
        ></div>

        <!-- Date Numbers -->
        <span
          class="relative z-10 cursor-pointer hover:bg-red-500 hover:rounded-full hover:text-white px-2 py-1 w-8 h-8 rounded-full flex items-center justify-center text-xs font-Rubik font-medium text-white"
          @click="date.type == 'prev' || date.type == 'next' ? '' : selectDate(date.day)"
          :class="{
            'bg-[#FF3435]': isSelected(date.day) && date.type != 'next' && date.type != 'prev',
            ' opacity-50 cursor-text hover:bg-transparent':
              date.type == 'prev' || date.type == 'next'
          }"
        >
          {{ date.day }}
        </span>
      </div>
    </div>

    <!-- Selected Info -->
    <!-- <div class="mt-4 text-sm text-gray-300">
      <p>
        From: <span class="text-white">{{ fromDate || 'Not selected' }}</span>
      </p>
      <p>
        To: <span class="text-white">{{ toDate || 'Not selected' }}</span>
      </p>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentMonth: 11,
      currentYear: 2021,
      daysOfWeek: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      years: Array.from({ length: 50 }, (_, i) => 2000 + i),
      fromDate: null,
      toDate: null,
      calendarDays: []
    }
  },
  created() {
    this.generateCalendar()
  },
  methods: {
    // Generate Calendar Days
    generateCalendar() {
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay()
      const daysInCurrentMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate()

      const daysInPreviousMonth = new Date(this.currentYear, this.currentMonth, 0).getDate()

      // Determine how many blank days before the first day (adjust for Monday start)
      const blankDaysBefore = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

      // Generate previous month days
      const prevMonthDays = Array.from(
        { length: blankDaysBefore },
        (_, i) => daysInPreviousMonth - blankDaysBefore + i + 1
      )

      // Generate current month days
      const currentMonthDays = Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1)

      // Determine how many blank days after the last day
      const totalDisplayedDays = prevMonthDays.length + currentMonthDays.length
      const blankDaysAfter = totalDisplayedDays % 7 === 0 ? 0 : 7 - (totalDisplayedDays % 7)

      // Generate next month days
      const nextMonthDays = Array.from({ length: blankDaysAfter }, (_, i) => i + 1)

      // Combine all days into a single array
      this.calendarDays = [
        ...prevMonthDays.map((day) => ({ day, type: 'prev' })),
        ...currentMonthDays.map((day) => ({ day, type: 'current' })),
        ...nextMonthDays.map((day) => ({ day, type: 'next' }))
      ]
    },

    // Select Dates
    selectDate(day) {
      if (!day) return

      const selectedDate = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

      if (!this.fromDate || (this.fromDate && this.toDate)) {
        this.fromDate = selectedDate
        this.toDate = null
      } else if (new Date(selectedDate) >= new Date(this.fromDate)) {
        this.toDate = selectedDate
      } else {
        this.toDate = this.fromDate
        this.fromDate = selectedDate
      }
    },
    // Check if Date is Selected
    isSelected(day) {
      if (!day) return false
      const date = this.formatDate(day)
      return this.fromDate === date || this.toDate === date
    },
    // Check if Date is In Range
    isInRange(day) {
      if (!this.fromDate || !this.toDate || !day) return false
      const date = this.formatDate(day)
      return new Date(date) > new Date(this.fromDate) && new Date(date) < new Date(this.toDate)
    },
    rangeBackgroundStyle(day) {
      if (day === 1) return 'rounded-l-lg'
      if (day === 31 || this.calendarDays.indexOf(day) % 7 === 6) return ''
      return ''
    },
    formatDate(day) {
      return `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: block;
  width: 0.3rem !important;
}
::-webkit-scrollbar-track {
  background: #710101 !important;
}
::-webkit-scrollbar-thumb {
  /* width: 2rem; */
  background: #e50404 !important;
  border-radius: 4px;
}
</style>
