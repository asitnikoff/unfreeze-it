<template>
  <div
    class="scoreboard"
    :style="{
      '--click-cool-down': `${$store.getters['scoreboard/NEXT_CLICK_COOL_DOWN']}ms`,
    }"
  >
    <Header class="scoreboard__header"></Header>
    <TransitionGroup name="flip-list">
      <TableRow
        v-for="[index, contestant] in contestants.entries()"
        :key="contestant.id"
        :contestant="contestant"
        class="scoreboard__row"
        :class="{
          scoreboard__current_contestant: currentContestantIndex === index,
        }"
        :contestType="$store.getters['scoreboard/CONTEST'].type"
      ></TableRow>
    </TransitionGroup>
  </div>
</template>

<script>
import TableRow from "@/components/TableRow.vue";
import Header from "@/components/Header.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    currentContestantIndex: Number,
  },
  components: {
    TableRow,
    Header,
  },
  computed: {
    ...mapGetters({
      contestants: "scoreboard/CONTESTANTS",
      currentContestant: "scoreboard/CURRENT_CONTESTANT",
      currentProblem: "scoreboard/CURRENT_PROBLEM",
    }),
  },
};
</script>

<style scoped>
.scoreboard__row {
  margin-top: 10px;
}
.flip-list-move {
  transition: transform var(--click-cool-down) ease-in-out;
}

.scoreboard__current_contestant {
  border: 2px solid black;
}
</style>
