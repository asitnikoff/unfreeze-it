export default {
  CONTEST: (state) => {
    return state.contest;
  },
  CONTEST_CONTESTANTS: (state) => {
    return state.contest.contestants;
  },
  CONTEST_SUBMISSIONS: (state) => {
    return state.contest.submissions;
  },
  CONTEST_PROBLEMS: (state) => {
    return state.contest.problems;
  },
  CONTEST_VERDICTS: (state) => {
    return state.contest.verdicts;
  },
  CURRENT_PROBLEM: (state) => {
    return state.currentProblem;
  },
  CURRENT_CONTESTANT: (state) => {
    return state.currentContestant;
  },
  CURRENT_CONTESTANT_INDEX: (state) => {
    return state.currentContestantIndex;
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
