<template>
  <div
    class="problem"
    :class="{
      problem__solved: this.problem.solved === true,
      problem__tried: this.problem.haveNextSubmission === true,
      problem__no_attempt: this.problem.wasAttempt === false,
      problem__first_accepted: this.problem.firstAccepted === true,
      problem__highlight: this.isHighlighting,
    }"
  >
    <div class="problem__text">
      {{ getDisplayText() }}
    </div>
  </div>
</template>

<script>
import data from "./data.js";
import props from "./props.js";
import methods from "./methods.js";
import watch from "./watch.js";

export default {
  data() {
    return data;
  },
  props,
  methods,
  watch,
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

.problem__highlight {
  border: 3px solid #1900ff;
}
</style>
