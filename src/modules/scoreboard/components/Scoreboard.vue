<template>
  <div class="scoreboard">
    <Header class="scoreboard__header"></Header>
    <div class="contestants">
      <TransitionGroup name="flip-list">
        <TableRow
          v-for="[index, contestant] in contestants.entries()"
          :key="contestant.id"
          :contestant="contestant"
          class="scoreboard__row"
          :class="{
            scoreboard__current_contestant: currentContestantIndex === index,
          }"
          :contestType="contestType"
        ></TableRow>
      </TransitionGroup>
    </div>
  </div>
</template>

<script lang="ts">
import TableRow from "@/modules/scoreboard/components/TableRow.vue";
import Header from "@/modules/scoreboard/components/Header.vue";
import { mapGetters } from "vuex";
import { defineComponent } from "vue";
import ScoreboardGetterEnum from "@/store/modules/scoreboard/types/getter-types";

export default defineComponent({
  name: "scoreboard",
  props: {
    currentContestantIndex: {
      type: Number,
      required: true,
    },
    isAccepted: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    TableRow,
    Header,
  },
  mounted() {},
  methods: {
    scrollToCurrentContestant(currentContestantIndex: number) {
      console.log("scrollToCurrentContestant is triggered");
      console.log(
        `current contestant title is ${
          currentContestantIndex === -1
            ? "undefined"
            : this.contestants[currentContestantIndex].title
        }`
      );
      let element: any = undefined;
      const contestantIndexToScroll = Math.max(-1, currentContestantIndex - 1);
      if (contestantIndexToScroll === -1) {
        element = document.getElementsByClassName("scoreboard__header")[0];
      } else {
        element =
          document.getElementsByClassName("scoreboard__row")[
            contestantIndexToScroll
          ];
      }
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        console.error(`${element} not found`);
      }
    },
  },
  computed: {
    contestType() {
      return this.contest.type;
    },
    contestantMoveDuration() {
      return `${this.clickCoolDown}ms`;
    },
    ...mapGetters("scoreboard", {
      contest: ScoreboardGetterEnum.GET_CONTEST,
      clickCoolDown: ScoreboardGetterEnum.GET_CLICK_COOL_DOWN,
      contestants: ScoreboardGetterEnum.GET_CONTESTANTS,
      currentContestant: ScoreboardGetterEnum.GET_CURRENT_CONTESTANT,
      currentProblem: ScoreboardGetterEnum.GET_CURRENT_PROBLEM,
    }),
  },
  watch: {
    currentContestantIndex(newValue: number, oldValue: number) {
      if (newValue !== -1) {
        this.scrollToCurrentContestant(newValue);
      }
    },
  },
});
</script>

<style scoped>
.contestants {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 40px;
}
.scoreboard__row {
  /* height: 262px; */
  padding: 20px 30px 30px;
  border: 2px solid #345e5a;
}

.flip-list-move {
  transition: transform v-bind(contestantMoveDuration) ease-in-out;
}

.scoreboard__current_contestant {
  border: 5px solid #345e5a;
}
</style>
