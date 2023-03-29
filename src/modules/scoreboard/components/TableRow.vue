<template>
  <div class="contestant">
    <div class="contestant__rank">{{ contestant.position }}</div>
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

<script lang="ts">
import ProblemCell from "@/modules/scoreboard/components/ProblemCell.vue";
import { defineComponent } from "vue";

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
      type: Object,
      required: true,
    },
  },
  methods: {},
});
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
