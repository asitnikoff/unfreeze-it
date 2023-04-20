<template>
  <div class="contestant">
    <div class="rank contestant__rank">
      <div class="rank__title">Rank</div>
      <div class="rank__data">{{ contestant.position }}</div>
    </div>
    <div class="contestant__center">
      <div class="contestant__title">{{ contestant.title }}</div>
      <div class="contestant__problems">
        <ProblemCell
          v-for="problem in contestant.problems"
          :key="problem.index"
          :problem="problem"
          :contestantTitle="contestant.title"
          :contestType="contestType"
        ></ProblemCell>
      </div>
    </div>
    <template v-if="contestType === 'ICPC'">
      <div class="contestant__icpc">
        <div class="solved_problems contestant__solved_problems">
          <div class="solved_problems__title">Total</div>
          <div class="solved_problem__data">{{ contestant.totalSolved }}</div>
        </div>
        <div class="penalty contestant__penalty">
          <div class="penalty__title">Penalty</div>
          <div class="penalty__data">{{ contestant.penalty }}</div>
        </div>
      </div>
    </template>
    <div class="contestant__points" v-if="contestType === 'IOI'">Points</div>
  </div>
</template>

<script lang="ts">
import ProblemCell from "@/modules/scoreboard/components/ProblemCell.vue";
import Contestant from "@/modules/scoreboard/models/Contestant";
import { defineComponent, type PropType } from "vue";

export default defineComponent({
  components: {
    ProblemCell,
  },
  props: {
    contestType: {
      type: String,
      required: true,
    },
    contestant: {
      type: Object as PropType<Contestant>,
      required: true,
    },
  },
  methods: {},
});
</script>

<style scoped>
* {
  color: #345e5a;
}
.contestant__rank {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.contestant__center {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  flex-grow: 1;
}

.contestant {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}

.rank__data {
  margin-top: 20px;
}

.contestant__problems {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
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
}

.contestant__penalty {
  margin-right: 40px;
  margin-left: 20px;
}

.penalty__data {
  margin-top: 20px;
}

.solved_problem__data {
  margin-top: 20px;
}
</style>
