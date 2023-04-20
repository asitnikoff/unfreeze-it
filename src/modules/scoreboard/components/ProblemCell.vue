<template>
  <div
    class="problem-box"
    :class="{
      'probem-current': problem.isCurrent && problem.haveNextSubmission,
    }"
  >
    <span v-if="problem.firstAccepted" class="problem__star"></span>
    <div class="problem-title">{{ problem.index }}</div>
    <div
      class="problem-data"
      :class="{
        problem__solved: problem.solved === true,
        'problem__have-try': problem.haveNextSubmission === true,
        'problem__no-attempt': problem.wasAttempt === false,
        'problem__first-accepted': problem.firstAccepted === true,
        problem__highlight: isHighlighting,
        'problem__highlight-transition': problem.isPending,
      }"
    >
      <div class="problem__text">
        {{ getDisplayText() }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type ContestantProblem from "@/modules/scoreboard/models/ContestantProblem";

export default defineComponent({
  data() {
    return {
      isHighlighting: false,
      highlightingTimer: -1 as unknown as ReturnType<typeof setInterval>,
    };
  },
  props: {
    contestType: {
      type: String,
      required: true,
    },
    problem: {
      type: Object as PropType<ContestantProblem>,
      required: true,
    },
    contestantTitle: {
      type: String,
      required: true,
    },
  },
  methods: {
    getDisplayText(): string {
      if (this.problem.wasAttempt === false) {
        return ".";
      }
      if (this.problem.solved) {
        if (this.contestType === "ICPC") {
          return `+${
            this.problem.incorrectAttempts === 0
              ? ""
              : this.problem.incorrectAttempts
          }`;
        }
      }
      if (this.problem.haveNextSubmission === true) {
        if (this.contestType === "ICPC") {
          return `?${this.problem.incorrectAttempts + 1}`;
        }
      }
      if (this.contestType === "ICPC") {
        return `-${this.problem.incorrectAttempts}`;
      }
      return "something bad";
    },
  },
  watch: {
    "problem.isPending"(newValue: boolean) {
      console.log(`problem.isPending changed on ${newValue}`);
      if (newValue) {
        this.highlightingTimer = setInterval(() => {
          this.isHighlighting = !this.isHighlighting;
        }, 500);
        console.log("start highlight");
      } else {
        clearInterval(this.highlightingTimer);
        this.highlightingTimer = -1 as unknown as ReturnType<
          typeof setInterval
        >;
        this.isHighlighting = false;
        console.log("end highlight");
      }
    },
  },
});
</script>

<style scoped>
.problem-title {
  color: #345e5a;
}
.problem-box {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 7px 8px;
}
.problem-data {
  width: 92px;
  height: 63px;
  text-align: center;
  background-color: #dd430f;
  padding: 2px 20px;
  border-radius: 10px;
  color: #f3e1b8;
}
.problem__have-try {
  background-color: #eda96c;
}

.problem__solved {
  background-color: #3c817a;
}

.problem__no-attempt {
  background-color: #f3e1b8;
  border: 3px solid #3c817a;
  color: #3c817a;
}

.problem__star {
  display: inline-block;
  background-image: url("@/assets/img/star.svg");
  background-repeat: no-repeat;
  width: 35px;
  height: 35px;
  top: 65px;
  right: -7px;
  z-index: 1;
  position: absolute;
}

.problem__first-accepted {
  background-color: #3c817a;
  /* border: 3px solid #ff0000; */
}

.problem__highlight {
  /* background-color: #e1893a; */
  background-color: #c86d1e;
}

.probem-current {
  border: 3px solid #3c817a;
  border-radius: 15px;
}

.problem__highlight-transition {
  transition: 500ms linear;
}
</style>
