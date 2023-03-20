export default {
  CONTEST: (state, payload) => {
    state.contest = payload;
  },
  CURRENT_PROBLEM: (state, payload) => {
    state.currentProblem = payload;
  },
  CURRENT_CONTESTANT: (state, payload) => {
    state.currentContestant = payload;
  },
  CURRENT_CONTESTANT_INDEX: (state, payload) => {
    state.currentContestantIndex = payload;
  },
  CURRENT_PROBLEM_INDEX: (state, payload) => {
    state.currentProblemIndex = payload;
  },
  PROBLEM_HIGHLIGHT_TIMER: (state, payload) => {
    state.problemHighlightTimer = payload;
  },
};
