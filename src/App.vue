<template>
  <div id="app">
    <Scoreboard
      class="app__scoreboard"
      @keydown="handleKeyPress"
      tabindex="0"
      :contest="contest"
      :currentContestantIndex="currentContestantIndex"
    ></Scoreboard>
  </div>
</template>

<script>
import Scoreboard from "@/components/Scoreboard.vue";
import getSolveData from "@/parsers/solve/solve.js";

export default {
  name: "app",
  data() {
    return {
      contest: {},
      currentContestantIndex: -1,
      currentProblemIndex: -1,
      allClicked: false,
    };
  },
  created() {
    this.getContestData();
  },
  components: {
    Scoreboard,
  },
  methods: {
    handleKeyPress(event) {
      switch (event.key) {
        case "n":
          console.log(
            "[dbg] ",
            this.currentContestantIndex,
            this.currentProblemIndex
          );
          if (this.currentProblemIndex !== -1) {
            let contestant =
              this.contest.contestants[this.currentContestantIndex];
            let submission = this.getNextSubmission(
              contestant,
              contestant.problems[this.currentProblemIndex]
            );
            if (submission.contestantName.includes("Михей")) {
              console.log("[dbg] ", submission);
            }
            this.revealSubmission(submission);
            this.updateNextSubmission(
              contestant,
              contestant.problems[this.currentProblemIndex]
            );
            this.updateScoreboard();
          } else {
            this.currentContestantIndex--;
          }
          this.findNextProblem();
          break;
        case "a":
          console.log("'a' clicked");
          if (this.allClicked === false) {
            this.allClicked = true;
            this.revealAll();
          }
          break;
      }
    },
    revealAll() {
      while (this.currentContestantIndex !== -1) {
        if (this.currentProblemIndex !== -1) {
          let contestant =
            this.contest.contestants[this.currentContestantIndex];
          let submission = this.getNextSubmission(
            contestant,
            contestant.problems[this.currentProblemIndex]
          );
          // console.log("[dbg] ", submission);
          this.revealSubmission(submission);
          this.updateNextSubmission(
            contestant,
            contestant.problems[this.currentProblemIndex]
          );
          this.updateScoreboard();
        } else {
          this.currentContestantIndex--;
        }
        this.findNextProblem();
      }
    },
    getScoreboardBeforeFreeze() {
      for (let submission of this.contest.submissions) {
        this.revealSubmission(submission, true);
      }
    },
    sortContestants() {
      this.contest.contestants.sort((a, b) => {
        if (a.totalSolved === b.totalSolved) {
          return a.penalty - b.penalty;
        }
        return b.totalSolved - a.totalSolved;
      });
    },
    updateContestantsPosition() {
      for (let i = 0; i < this.contest.contestants.length; ++i) {
        if (
          i > 0 &&
          this.contest.contestants[i].totalSolved ===
            this.contest.contestants[i - 1].totalSolved &&
          this.contest.contestants[i].penalty ===
            this.contest.contestants[i - 1].penalty
        ) {
          this.contest.contestants[i].position =
            this.contest.contestants[i - 1].position;
        } else {
          this.contest.contestants[i].position = i + 1;
        }
      }
    },
    updateScoreboard() {
      this.sortContestants();
      this.updateContestantsPosition();
    },
    getNextSubmission(contestant, problem) {
      return this.contest.submissions.find((submission) => {
        return (
          submission.problemIndex === problem.index &&
          submission.contestantName === contestant.title &&
          submission.timeSubmitted > problem.lastSubmissionTime
        );
      });
    },
    updateNextSubmission(contestant, problem) {
      let submission = this.getNextSubmission(contestant, problem);
      if (submission !== undefined && problem.solved === false) {
        problem.haveNextSubmission = true;
      } else {
        problem.haveNextSubmission = false;
      }
    },
    initNextSubmissions() {
      for (let contestant of this.contest.contestants) {
        for (let problem of contestant.problems) {
          if (problem.solved === true) {
            continue;
          }
          this.updateNextSubmission(contestant, problem);
        }
      }
    },
    revealSubmission(submission, isFreeze = false) {
      if (submission === undefined) {
        submission = this.getNextSubmission(
          this.contest.submissions,
          this.contest.contestants[this.currentContestantIndex].title,
          this.contest.contestants[this.currentContestantIndex].problems[
            this.currentProblemIndex
          ]
        );
      }
      // console.log("[dbgggg] ", submission);
      let contestantTitle = submission.contestantName;
      let contestantIndex = this.contest.contestants.findIndex(
        (contestant) => contestant.title === contestantTitle
      );
      let contestantProblemIndex = this.contest.contestants[
        contestantIndex
      ].problems.findIndex(
        (problem) => problem.index === submission.problemIndex
      );
      this.contest.contestants[contestantIndex].problems[
        contestantProblemIndex
      ].wasAttempt = true;

      if (
        submission.timeSubmitted >= this.contest.metadata.freezeTime &&
        isFreeze === true
      ) {
        return;
      }

      if (
        submission.contestantName.includes("Михей") &&
        submission.problemIndex === "E"
      ) {
        console.log("[submission dbg] ", submission);
      }
      this.contest.contestants[contestantIndex].problems[
        contestantProblemIndex
      ].lastSubmissionTime = submission.timeSubmitted;
      this.updateNextSubmission(
        this.contest.contestants[contestantIndex],
        this.contest.contestants[contestantIndex].problems[
          contestantProblemIndex
        ]
      );

      if (contestantIndex === -1) {
        console.log("contestant bad :(");
      }
      if (
        this.contest.contestants[contestantIndex].problems[
          contestantProblemIndex
        ].solved === false
      ) {
        if (
          this.contest.verdicts.withPenalty.includes(submission.verdict) ===
          true
        ) {
          this.contest.contestants[contestantIndex].problems[
            contestantProblemIndex
          ].penalty += this.contest.metadata.penalty;
          this.contest.contestants[contestantIndex].problems[
            contestantProblemIndex
          ].incorrectAttempts++;
        } else if (
          this.contest.verdicts.accepted.includes(submission.verdict) === true
        ) {
          let globalProblem = this.contest.problems.find(
            (problem) =>
              problem.index ===
              this.contest.contestants[contestantIndex].problems[
                contestantProblemIndex
              ].index
          );
          if (globalProblem.solved === false) {
            this.contest.contestants[contestantIndex].problems[
              contestantProblemIndex
            ].firstAccepted = true;
            globalProblem.solved = true;
          }
          this.contest.contestants[contestantIndex].problems[
            contestantProblemIndex
          ].solved = true;
          this.contest.contestants[contestantIndex].problems[
            contestantProblemIndex
          ].penalty += Math.trunc(submission.timeSubmitted / 60);
          this.contest.contestants[contestantIndex].penalty +=
            this.contest.contestants[contestantIndex].problems[
              contestantProblemIndex
            ].penalty;
          this.contest.contestants[contestantIndex].totalSolved++;
        }
      }
    },
    findNextProblem() {
      if (this.currentContestantIndex === -1) {
        return;
      }
      this.currentProblemIndex = -1;
      for (let [index, problem] of this.contest.contestants[
        this.currentContestantIndex
      ].problems.entries()) {
        if (problem.haveNextSubmission === true) {
          this.currentProblemIndex = index;
          break;
        }
      }
    },
    getContestData() {
      this.contest = getSolveData();
      for (let submission of this.contest.submissions) {
        if (
          submission.contestantName.includes("Михей") &&
          submission.problemIndex === "E"
        ) {
          console.log("[init dbg] ", submission);
        }
      }
      this.getScoreboardBeforeFreeze();
      this.currentContestantIndex = this.contest.contestants.length - 1;
      this.sortContestants();
      this.updateContestantsPosition();
      this.initNextSubmissions();
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  padding: 10px;
}

.app__scoreboard:focus {
  outline: none;
}
</style>
