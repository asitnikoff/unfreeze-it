export default {
  currentProblem(newValue) {
    if (
      newValue.index === this.problem.index &&
      this.$store.getters["scoreboard/CURRENT_CONTESTANT"].title ===
        this.contestantTitle
    ) {
      if (this.problemHighlightTimer === -1) {
        this.$store.dispatch(
          "scoreboard/SET_PROBLEM_HIGHLIGHT_TIMER",
          setInterval(() => {
            this.isHighlighting = !this.isHighlighting;
          }, 1000)
        );
      }
    } else {
      this.$store.dispatch("scoreboard/CLEAR_PROBLEM_HIGHLIGHT_TIMER");
      this.isHighlighting = false;
    }
  },
};
