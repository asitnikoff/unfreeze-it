<template>
  <div class="scoreboard">
    <Header class="scoreboard__header"></Header>
    <TransitionGroup name="flip-list" @enter="onEnter" @leave="onLeave">
      <TableRow
        v-for="[index, contestant] in contestants.entries()"
        :key="contestant.id"
        :contestant="contestant"
        :currentContestant="currentContestant"
        :currentProblem="currentProblem"
        @enter="onEnter"
        class="scoreboard__row"
        :class="{
          scoreboard__current_contestant: this.currentContestantIndex === index,
        }"
        :contestType="$store.getters.CONTEST.metadata.type"
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
      contestants: this.$store.getters.CONTEST.contestants,
    };
  },
  emits: ["enter", "leave"],
  props: {
    currentContestantIndex: Number,
    currentContestant: Object,
    currentProblem: Object,
  },
  components: {
    TableRow,
    Header,
  },
  methods: {
    onEnter(el, done) {
      console.log("enter: ", el);
      done();
    },
    onLeave(el, done) {
      console.log("leave: ", el);
      done();
    },
  },
};
</script>

<style scoped>
.scoreboard__row {
  margin-top: 10px;
}
.flip-list-move {
  transition: transform 3s;
}

.scoreboard__current_contestant {
  border: 2px solid black;
}
</style>
