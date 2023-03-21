export default {
  getProblem(problem) {
    return {
      solved: problem.solved,
      haveNextSubmission: problem.haveNextSubmission,
      wasAttempt: problem.wasAttempt,
      firstAccepted: problem.firstAccepted,
      index: problem.index,
      incorrectAttempts: problem.incorrectAttempts,
    };
  },
  getCurrentContestant(contestant) {
    return {
      title: contestant.title,
    };
  },
  getCurrentProblem(problem) {
    return problem;
  },
};
