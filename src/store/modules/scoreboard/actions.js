export default {
  CLEAR_PROBLEM_HIGHLIGHT_TIMER: (context) => {
    clearInterval(context.getters.PROBLEM_HIGHLIGHT_TIMER);
    context.commit("PROBLEM_HIGHLIGHT_TIMER", -1);
  },
  SET_PROBLEM_HIGHLIGHT_TIMER: (context, payload) => {
    context.commit("PROBLEM_HIGHLIGHT_TIMER", payload);
  },
};
