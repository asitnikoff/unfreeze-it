export default {
  CONTEST: (state, payload) => {
    state.contest = payload;
  },
  PROBLEMS: (state, payload) => {
    state.problems = payload;
  },
  CONTESTANTS: (state, payload) => {
    state.contestants = payload;
  },
  SUBMISSIONS: (state, payload) => {
    state.submissions = payload;
  },
  VERDICTS: (state, payload) => {
    state.verdicts = payload;
  },
  CURRENT_PROBLEM: (state, payload) => {
    state.currentProblem = payload;
  },
  CURRENT_CONTESTANT: (state, payload) => {
    state.currentContestant = payload;
  },
  CURRENT_PROBLEM_INDEX: (state, payload) => {
    state.currentProblemIndex = payload;
  },
  PROBLEM_HIGHLIGHT_TIMER: (state, payload) => {
    state.problemHighlightTimer = payload;
  },
};
