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
import data from "./data.js";
import props from "./props.js";
import components from "./components.js";

export default {
  data() {
    return data;
  },
  props,
  components,
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
