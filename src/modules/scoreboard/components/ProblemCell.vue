<template>
  <div
    class="problem"
    :class="{
      problem__solved: problem.solved === true,
      problem__tried: problem.haveNextSubmission === true,
      problem__no_attempt: problem.wasAttempt === false,
      problem__first_accepted: problem.firstAccepted === true,
      problem__highlight: isHighlighting,
    }"
  >
    <div class="problem__text">
      {{ getDisplayText() }}
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
        return `${this.problem.index}`;
      }
      if (this.contestType === "ICPC") {
        if (this.problem.haveNextSubmission === true) {
          return `${this.problem.index} - ${
            this.problem.incorrectAttempts + 1
          }?`;
        }
        return `${this.problem.index} - ${this.problem.incorrectAttempts}`;
      }
      return `${this.problem.index} - ${this.problem.points}`;
    },
  },
  watch: {
    currentProblem(newValue) {
      if (
        newValue.index === this.problem.index &&
        this.$store.getters["scoreboard/CURRENT_CONTESTANT"].title ===
          this.contestantTitle
      ) {
        if (this.isHighlighting === true) {
          this.$store.dispatch(
            "scoreboard/SET_PROBLEM_HIGHLIGHT_TIMER",
            setInterval(() => {
              this.isHighlighting = false;
            }, 1000)
          );
        }
      } else {
        this.$store.dispatch("scoreboard/CLEAR_PROBLEM_HIGHLIGHT_TIMER");
        this.isHighlighting = false;
      }
    },
  },
});
</script>

<style scoped>
.problem {
  background-color: #ff4848;
  padding: 5px 10px;
  border-radius: 20px;
}
.problem__tried {
  background-color: yellow;
}

.problem__solved {
  background-color: #00c900;
}

.problem__no_attempt {
  background-color: gray;
}

.problem__first_accepted {
  background-color: #009700;
  border: 3px solid #ff0000;
}

.problem__highlight {
  border: 3px solid #1900ff;
}
</style>
