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
        :currentContestant="currentContestant"
        :currentProblem="currentProblem"
        class="scoreboard__row"
        :class="{
          scoreboard__current_contestant: currentContestantIndex === index,
        }"
        :contestType="$store.getters['scoreboard/CONTEST'].metadata.type"
      ></TableRow>
    </TransitionGroup>
  </div>
</template>

<script>
import TableRow from "@/components/TableRow.vue";
import Header from "@/components/Header.vue";

export default {
  data() {
    return {
      contestants: this.$store.getters["scoreboard/CONTEST_CONTESTANTS"],
    };
  },
  props: {
    currentContestantIndex: Number,
    currentContestant: Object,
    currentProblem: Object,
  },
  components: {
    TableRow,
    Header,
  },
  methods: {},
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
