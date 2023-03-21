export default {
  getDisplayText() {
    if (this.problem.wasAttempt === false) {
      return `${this.problem.index}`;
    }
    if (this.contestType === "ICPC") {
      if (this.problem.haveNextSubmission === true) {
        return `${this.problem.index} - ${this.problem.incorrectAttempts + 1}?`;
      }
      return `${this.problem.index} - ${this.problem.incorrectAttempts}`;
    }
    return `${this.problem.index} - ${this.problem.points}`;
  },
};
