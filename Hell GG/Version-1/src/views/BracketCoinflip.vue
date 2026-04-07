<template>
  <div class="px-4 w-full">
    <div class="max-h-[40rem] flex items-center justify-center w-full">
      <div class="container bg-black">
        <div class="tournament-bracket tournament-bracket--rounded">
          <div
            v-for="(round, roundIndex) in tournamentRounds"
            :key="roundIndex"
            class="tournament-bracket__round"
            :class="round.class"
          >
            <div class="tournament-bracket__list gap-y-10">
              <div
                v-for="(match, matchIndex) in round.matches"
                :key="matchIndex"
                class="tournament-bracket__item"
              >
                <div class="tournament-bracket__match">
                  <div
                    class="tournament-bracket__table rotate-90 flex flex-col gap-y-2 items-center justify-center min-w-[10rem] max-h-[7rem] bg-emerald-900"
                  >
                    <span>$50.00</span>
                    <div class="h-9">
                      <div class="bg-white h-full w-9">asd</div>
                    </div>
                    <button class="h-7 bg-red-900 w-full"></button>
                  </div>
                </div>
                <div
                  v-if="matchIndex % 2 != 0 && roundIndex == 0 && matchIndex != 7"
                  className="h-px w-10 absolute left-10 top-full  mt-5 bg-[#ff3435]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped src="../assets/css/tournament_bracket.css" />
<script>
export default {
  data() {
    return {
      tournamentRounds: [
        {
          title: 'round of 16',
          class: 'tournament-bracket__round--quarterfinals',
          matches: [
            {
              date: '1998-02-18',
              teams: [
                { code: 'CAN', name: 'Canada', score: 4, winner: true },
                { code: 'KAZ', name: 'Kazakhstan', score: 1, winner: false }
              ]
            },
            {
              date: '1998-02-18',
              teams: [
                { code: 'CAN', name: 'Canada', score: 4, winner: true },
                { code: 'KAZ', name: 'Kazakhstan', score: 1, winner: false }
              ]
            },
            {
              date: '1998-02-18',
              teams: [
                { code: 'CAN', name: 'Canada', score: 4, winner: true },
                { code: 'KAZ', name: 'Kazakhstan', score: 1, winner: false }
              ]
            },
            {
              date: '1998-02-18',
              teams: [
                { code: 'CAN', name: 'Canada', score: 4, winner: true },
                { code: 'KAZ', name: 'Kazakhstan', score: 1, winner: false }
              ]
            },
            {
              date: '1998-02-18',
              teams: [
                { code: 'CAN', name: 'Canada', score: 4, winner: true },
                { code: 'KAZ', name: 'Kazakhstan', score: 1, winner: false }
              ]
            },
            {
              date: '1998-02-18',
              teams: [
                { code: 'CZE', name: 'Czech Republic', score: 4, winner: true },
                { code: 'USA', name: 'United States of America', score: 1, winner: false }
              ]
            },
            {
              date: '1998-02-18',
              teams: [
                { code: 'FIN', name: 'Finland', score: 2, winner: true },
                { code: 'SVE', name: 'Sweden', score: 1, winner: false }
              ]
            },
            {
              date: '1998-02-18',
              teams: [
                { code: 'RUS', name: 'Russia', score: 4, winner: true },
                { code: 'BEL', name: 'Belarus', score: 1, winner: false }
              ]
            }
          ]
        },
        {
          title: 'Quarterfinals',
          class: 'tournament-bracket__round--quarterfinals',
          matches: [
            {
              date: '1998-02-18',
              teams: [
                { code: 'CAN', name: 'Canada', score: 4, winner: true },
                { code: 'KAZ', name: 'Kazakhstan', score: 1, winner: false }
              ]
            },
            {
              date: '1998-02-18',
              teams: [
                { code: 'CZE', name: 'Czech Republic', score: 4, winner: true },
                { code: 'USA', name: 'United States of America', score: 1, winner: false }
              ]
            },
            {
              date: '1998-02-18',
              teams: [
                { code: 'FIN', name: 'Finland', score: 2, winner: true },
                { code: 'SVE', name: 'Sweden', score: 1, winner: false }
              ]
            },
            {
              date: '1998-02-18',
              teams: [
                { code: 'RUS', name: 'Russia', score: 4, winner: true },
                { code: 'BEL', name: 'Belarus', score: 1, winner: false }
              ]
            }
          ]
        },
        {
          title: 'Semifinals',
          class: 'tournament-bracket__round--semifinals',
          matches: [
            {
              date: '1998-02-20',
              teams: [
                { code: 'CAN', name: 'Canada', score: 1, winner: false },
                { code: 'CZE', name: 'Czech Republic', score: 2, winner: true }
              ]
            },
            {
              date: '1998-02-20',
              teams: [
                { code: 'FIN', name: 'Finland', score: 4, winner: false },
                { code: 'RUS', name: 'Russia', score: 7, winner: true }
              ]
            }
          ]
        },
        {
          title: 'Bronze medal game',
          class: 'tournament-bracket__round--bronze',
          matches: [
            {
              date: '1998-02-21',
              teams: [
                { code: 'FIN', name: 'Finland', score: 3, winner: true },
                { code: 'CAN', name: 'Canada', score: 2, winner: false }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
