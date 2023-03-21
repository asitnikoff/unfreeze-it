<template>
  <div class="contestant">
    <div class="contestant__rank">{{ contestant.position }}</div>
    <div class="contestant__title">{{ contestant.title }}</div>
    <div class="contestant__problems">
      <ProblemCell
        v-for="problem in contestant.problems"
        :key="problem.id"
        :problem="this.getProblem(problem)"
        :contestantTitle="contestant.title"
        :contestType="contestType"
        :currentContestant="getCurrentContestant(currentContestant)"
        :currentProblem="getCurrentProblem(currentProblem)"
      ></ProblemCell>
    </div>
    <template v-if="contestType === 'ICPC'">
      <div class="contestant__icpc">
        <div class="contestant__solved_problems">
          {{ contestant.totalSolved }}
        </div>
        <div class="contestant__penalty">{{ contestant.penalty }}</div>
      </div>
    </template>
    <div class="contestant__points" v-if="contestType === 'IOI'">Points</div>
  </div>
</template>

<script>
import components from "./components.js";
import props from "./props.js";
import methods from "./methods.js";

export default {
  components,
  props,
  methods,
};
</script>

<style scoped>
.contestant {
  display: flex;
  gap: 10px;
}

.contestant__rank {
  width: 2%;
  text-align: center;
}

.contestant__title {
  width: 10%;
}

.contestant__problems {
  width: 82%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.contestant__problem {
  height: max-content;
  background-color: #4cff55;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px 20px;
  border-radius: 20px;
}

.contestant__icpc {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 5.5%;
}
</style>
