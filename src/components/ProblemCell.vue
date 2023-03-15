<template>
  <div
    class="problem"
    :class="{
      problem__solved: this.problem.solved === true,
      problem__tried: this.problem.haveNextSubmission === true,
      problem__no_attempt: this.problem.wasAttempt === false,
      problem__first_accepted: this.problem.firstAccepted === true,
    }"
  >
    <div class="problem__text">
      {{ getDisplayText() }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contestType: String,
    problem: Object,
    contestant: Object,
  },
  methods: {
    getDisplayText() {
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
};
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
</style>
