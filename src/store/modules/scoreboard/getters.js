export default {
  CONTEST: (state) => {
    return state.contest;
  },
  PROBLEMS: (state) => {
    return state.problems;
  },
  CONTESTANTS: (state) => {
    return state.contestants;
  },
  SUBMISSIONS: (state) => {
    return state.submissions;
  },
  VERDICTS: (state) => {
    return state.verdicts;
  },
  CURRENT_PROBLEM: (state) => {
    return state.currentProblem;
  },
  CURRENT_CONTESTANT: (state) => {
    return state.currentContestant;
  },
  CURRENT_PROBLEM_INDEX: (state) => {
    return state.currentProblemIndex;
  },
  PROBLEM_HIGHLIGHT_TIMER: (state) => {
    return state.problemHighlightTimer;
  },
  NEXT_CLICK_COOL_DOWN: (state) => {
    return state.nextClickCoolDown;
  },
};
