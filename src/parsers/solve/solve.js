import problems from "./solve-problems.js";
import participants from "./solve-participants.js";
import solutions from "./solve-solutions.js";

const contest = {
  metadata: {
    title: "Computer Science Cup: Квалификация",
    duration: 18000,
    freezeTime: 14400,
    type: "ICPC",
    penalty: 20,
  },
  problems: [],
  verdicts: {
    accepted: ["accepted"],
    withPenalty: [
      "wrong_answer",
      "runtime_error",
      "time_limit_exceeded",
      "memory_limit_exceeded",
      "presentation_error",
    ],
    withoutPenalty: ["compilation_error"],
  },
  contestants: [],
  submissions: [],
};
const startTime = 1677924000;

export default function getSolveData() {
  parseProblems(contest);
  parseContestants(contest);
  if (contest.metadata.type === "ICPC") {
    parseSubmissionsICPC(contest);
  } else {
    parseSubmmissionsIOI(contest);
  }
  return contest;
}

function parseProblems(contest) {
  contest.problems = problems
    .map((problem, index) => {
      return {
        id: index,
        index: problem.code,
        title: problem.title,
        solved: false,
      };
    })
    .filter((problem) => problem !== undefined);
}

function parseContestants(contest) {
  contest.contestants = participants
    .map((participant, index) => {
      if (participant["kind"] !== "regular") {
        return undefined;
      }

      let contestantProblemsData = contest.problems.map((problem, index) => {
        return {
          id: index,
          index: problem.index,
          solved: false,
          penalty: 0,
          points: undefined,
          firstAccepted: false,
          wasAttempt: false,
          incorrectAttempts: 0,
          lastSubmissionTime: 0,
          haveNextSubmission: false,
        };
      });

      return {
        id: index,
        position: index,
        title: participant.scope_user.title,
        problems: contestantProblemsData,
        totalSolved: 0,
        penalty: 0,
        points: undefined,
      };
    })
    .filter((contestant) => contestant !== undefined);
}

function parseSubmissionsICPC(contest) {
  solutions.sort((a, b) => a.create_time - b.create_time);
  contest.submissions = solutions
    .map((solution) => {
      if (solution.participant.kind !== "regular") {
        return undefined;
      }
      if (contest.verdicts.withoutPenalty.includes(solution.report.verdict)) {
        return undefined;
      }
      return {
        // timeSubmitted: Math.trunc((solution.create_time - startTime) / 60),
        timeSubmitted: solution.create_time - startTime,
        contestantName: solution.participant.scope_user.title,
        problemIndex: solution.problem.code,
        verdict: solution.report.verdict,
        points: undefined,
      };
    })
    .filter((submission) => submission !== undefined);
}

function parseSubmmissionsIOI(contest) {
  // TODO: realize IOI submissions
}
