<template>
  <div class="scoreboard">
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
        :contestType=contestType
      ></TableRow>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import TableRow from "@/modules/scoreboard/components/TableRow.vue";
import Header from "@/modules/scoreboard/components/Header.vue";
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import ScoreboardGetterEnum from "@/store/modules/scoreboard/types/getter-types";

export default defineComponent({
  props: {
    currentContestantIndex: {
      type: Number,
      required: true,
    },
  },
  components: {
    TableRow,
    Header,
  },
  computed: {
    contestType() {
      return this.contest.type;
    },
    contestantMoveDuration() {
      return `${this.clickCoolDown}ms`;
    },
    ...mapGetters('scoreboard', {
      contest: ScoreboardGetterEnum.GET_CONTEST,
      clickCoolDown: ScoreboardGetterEnum.GET_CLICK_COOL_DOWN,
      contestants: ScoreboardGetterEnum.GET_CONTESTANTS,
      currentContestant: ScoreboardGetterEnum.GET_CURRENT_CONTESTANT,
      currentProblem: ScoreboardGetterEnum.GET_CURRENT_PROBLEM,
    }),
  },
});
</script>

<style scoped>
.scoreboard__row {
  margin-top: 10px;
}

.flip-list-move {
  transition: transform v-bind(contestantMoveDuration) ease-in-out;
}

.scoreboard__current_contestant {
  border: 2px solid black;
}
</style>
