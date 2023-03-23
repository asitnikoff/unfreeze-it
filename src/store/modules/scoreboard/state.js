export default () => {
  return {
    contest: {},
    problems: {},
    contestants: {},
    submissions: {},
    verdicts: {},
    currentProblem: {},
    currentContestant: {},
    currentProblemIndex: -1,
    problemHighlightTimer: -1,
    nextClickCoolDown: 1000,
  };
};
