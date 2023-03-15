export default {
  // object: information about contest
  metadata: {
    // string: contest name
    title: "BSUIR Open XI",
    // integer: contest duration
    duration: undefined,
    // integer: contest freeze time (minutes before end)
    freezeTime: undefined,
    // string: contest type - "ICPC" or "IOI"
    type: "ICPC",
    // integer: penalty for incorrect solution
    penalty: 0,
  },
  // array[object]: list of problems in contest
  problems: [
    // object: information about problem
    {
      // integer: unique id (for Vue)
      id: 0,
      // string: short title or letter of problem
      index: "A",
      // string: problem name
      title: "Problem A",
      // boolean: solved or no?
      solved: false,
    },
    {
      id: 1,
      index: "B",
      title: "Problem B",
      solved: false,
    },
    {
      id: 2,
      index: "C",
      title: "Problem C",
      solved: false,
    },
  ],
  // object: information about verdicts
  verdicts: {
    // array[string]: accepted verdicts
    accepted: [],
    // array[string]: vecdicts with penalty
    withPenalty: [],
    // array[string]: verdicts without penalty
    withoutPenalty: [],
    // array[string]: partial points verdicts (only IOI type)
    partial: [],
  },
  // array[object]: information about contestants
  contestants: [
    // object: information about contestant
    {
      // integer: unique id (for Vue)
      id: 0,
      // integer: position in scoreboard
      position: 1,
      // string: contestant name
      title: "Team A",
      // array[object]: information about problems for specific contestant
      problems: [
        // object: information about problem
        {
          // string: problem index
          index: "A",
          // boolean: flag - problem solved or no?
          solved: false,
          // integer: penalty for specific task
          penalty: 0,
          // float: points for specific task
          points: 0,
          // boolean: first solved?
          firstAccepted: false,
          // boolean: attempted?
          wasAttempt: false,
          // integer: amount of incorrect attempts
          incorrectAttempts: 0,
          // integer: time of last submission (in minutes)
          lastSubmissionTime: 0,
          // boolean: have next submission?
          haveNextSubmission: false,
        },
      ],
      // integer: amount of solved problems
      totalSolved: 0,
      // integer: total penalty (for ICPC type)
      penalty: 0,
      // float: total points (for IOI type)
      points: 0,
    },
    {
      id: 1,
      position: 2,
      title: "Team B",
      problems: [
        {
          index: "A",
          solved: false,
        },
      ],
    },
    {
      id: 2,
      position: 3,
      title: "Team C",
      problems: [
        {
          index: "A",
          solved: false,
        },
      ],
    },
    {
      id: 3,
      position: 4,
      title: "Team D",
      problems: [
        {
          index: "A",
          solved: false,
        },
      ],
    },
    {
      id: 4,
      position: 5,
      title: "Team E",
      problems: [
        {
          index: "A",
          solved: false,
        },
      ],
    },
    {
      id: 5,
      position: 6,
      title: "Team F",
      problems: [
        {
          index: "A",
          solved: false,
        },
      ],
    },
    {
      id: 6,
      position: 7,
      title: "Team G",
      problems: [
        {
          index: "A",
          solved: false,
        },
      ],
    },
  ],
  // array[object]: information about sumbissions
  submissions: [
    // object: information about submission
    {
      // integer: time when was submitted
      timeSubmitted: undefined,
      // string: contestant name
      contestantName: undefined,
      // string: problem index
      problemIndex: undefined,
      // string: submission verdict
      verdict: undefined,
      // float: submission points (for IOI)
      points: undefined,
    },
  ],
};
