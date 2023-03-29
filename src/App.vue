<template>
  <div id="app">
    <Scoreboard
      class="app__scoreboard"
      @keydown="handleKeyPress"
      tabindex="0"
      :currentContestantIndex="currentContestantIndex"
      :currentContestant="
        currentContestantIndex === -1 ? {} : contestants[currentContestantIndex]
      "
      :currentProblem="
        currentProblemIndex === -1 ? {} : problems[currentProblemIndex]
      "
    ></Scoreboard>
  </div>
</template>

<!--suppress JSUnusedGlobalSymbols -->
<script lang="ts">
import Scoreboard from "@/modules/scoreboard/components/Scoreboard.vue";
import {
  solveContest,
  solveVerdicts,
  getSolveProblems,
  getSolveContestants,
  getSolveSubmissionsICPC,
} from "@/parsers/solve/solve";
import { mapGetters, mapActions } from "vuex";
import { defineComponent } from "vue";
import Contestant from "@/modules/scoreboard/models/Contestant";
import Submission from "@/modules/scoreboard/models/Submission";
import Problem from "@/modules/scoreboard/models/Problem";
import ContestantProblem from "@/modules/scoreboard/models/ContestantProblem";

export default defineComponent({
  name: "app",
  data() {
    return {
      currentContestantIndex: -1,
      currentProblemIndex: -1,
      allClicked: false,
      isTransitionAnimation: false,
    };
  },
  created() {
    document.title = "Scoreboard";
    this.getContestData();
  },
  components: {
    Scoreboard,
  },
  methods: {
    handleKeyPress(event: KeyboardEvent) {
      switch (event.key) {
        case "n":
          if (this.isTransitionAnimation === true) {
            break;
          }
          if (this.currentProblemIndex !== -1) {
            let contestant = this.contestants[this.currentContestantIndex];
            let submission = this.getNextSubmission(
              contestant,
              contestant.problems[this.currentProblemIndex]
            );
            this.revealSubmission(submission);
            this.updateNextSubmission(
              contestant,
              contestant.problems[this.currentProblemIndex]
            );
            this.updateScoreboard();
          } else {
            this.currentContestantIndex--;
            this.setCurrentContestant(
              this.currentContestantIndex === -1
                ? {}
                : this.contestants[this.currentContestantIndex]
            );
          }
          this.findNextProblem();
          this.setCurrentProblem(
            this.currentProblemIndex === -1
              ? {}
              : this.problems[this.currentProblemIndex]
          );
          break;
        case "a":
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
          let contestant = this.contestants[this.currentContestantIndex];
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
      for (let submission of this.submissions) {
        this.revealSubmission(submission, true);
      }
    },
    sortContestantsICPC() {
      this.contestants.sort((a: Contestant, b: Contestant) => {
        if (a.totalSolved === b.totalSolved) {
          return a.penalty! - b.penalty!;
        }
        return b.totalSolved! - a.totalSolved!;
      });
    },
    updateContestantsPosition() {
      for (let i = 0; i < this.contestants.length; ++i) {
        if (
          i > 0 &&
          this.contestants[i].totalSolved ===
            this.contestants[i - 1].totalSolved &&
          this.contestants[i].penalty === this.contestants[i - 1].penalty
        ) {
          this.contestants[i].position = this.contestants[i - 1].position;
        } else {
          this.contestants[i].position = i + 1;
        }
      }
    },
    shiftContestant() {
      let i = this.currentContestantIndex;
      while (i > 0) {
        if (
          this.contestants[i].totalSolved >
            this.contestants[i - 1].totalSolved ||
          (this.contestants[i].totalSolved ===
            this.contestants[i - 1].totalSolved &&
            this.contestants[i].penalty < this.contestants[i - 1].penalty)
        ) {
          [this.contestants[i - 1], this.contestants[i]] = [
            this.contestants[i],
            this.contestants[i - 1],
          ];
        }
        --i;
      }
    },
    updateScoreboard() {
      // this.sortContestantsICPC();
      this.shiftContestant();
      this.updateContestantsPosition();
    },
    getNextSubmission(contestant: Contestant, contestantProblem: ContestantProblem) {
      return this.submissions.find((submission: Submission) => {
        return (
          submission.problemIndex === contestantProblem.index &&
          submission.contestantName === contestant.title &&
          submission.timeSubmitted > contestantProblem.lastSubmissionTime
        );
      });
    },
    updateNextSubmission(contestant: Contestant, problem: ContestantProblem) {
      let submission = this.getNextSubmission(contestant, problem);
      problem.haveNextSubmission =
        submission !== undefined && problem.solved === false;
    },
    initNextSubmissions() {
      for (let contestant of this.contestants) {
        for (let problem of contestant.problems) {
          if (problem.solved === true) {
            continue;
          }
          this.updateNextSubmission(contestant, problem);
        }
      }
    },
    revealSubmission(submission?: Submission, isFreeze: boolean = false) {
      if (submission === undefined) {
        submission = this.getNextSubmission(
          this.submissions,
          this.contestants[this.currentContestantIndex].problems[
            this.currentProblemIndex
          ]
        );
      }
      let contestantTitle = submission!.contestantName;
      let contestantIndex = this.contestants.findIndex(
        (contestant: Contestant) => contestant.title === contestantTitle
      );
      let contestantProblemIndex = this.contestants[
        contestantIndex
      ].problems.findIndex(
        (problem: Problem) => problem.index === submission!.problemIndex
      );
      this.contestants[contestantIndex].problems[
        contestantProblemIndex
      ].wasAttempt = true;

      if (
        submission!.timeSubmitted >= this.contest.freezeTime &&
        isFreeze === true
      ) {
        return;
      }

      this.contestants[contestantIndex].problems[
        contestantProblemIndex
      ].lastSubmissionTime = submission!.timeSubmitted;
      this.updateNextSubmission(
        this.contestants[contestantIndex],
        this.contestants[contestantIndex].problems[contestantProblemIndex]
      );

      if (contestantIndex === -1) {
        console.log("contestant bad :(");
      }
      if (
        this.contestants[contestantIndex].problems[contestantProblemIndex]
          .solved === false
      ) {
        if (this.verdicts.withPenalty.includes(submission!.verdict) === true) {
          this.contestants[contestantIndex].problems[
            contestantProblemIndex
          ].penalty += this.contest.penalty;
          this.contestants[contestantIndex].problems[contestantProblemIndex]
            .incorrectAttempts++;
        } else if (
          this.verdicts.accepted.includes(submission!.verdict) === true
        ) {
          let globalProblem = this.problems.find(
            (problem: Problem) =>
              problem.index ===
              this.contestants[contestantIndex].problems[contestantProblemIndex]
                .index
          );
          if (globalProblem.solved === false) {
            this.contestants[contestantIndex].problems[
              contestantProblemIndex
            ].firstAccepted = true;
            globalProblem.solved = true;
          }
          this.contestants[contestantIndex].problems[
            contestantProblemIndex
          ].solved = true;
          this.contestants[contestantIndex].problems[
            contestantProblemIndex
          ].penalty += Math.trunc(submission!.timeSubmitted / 60);
          this.contestants[contestantIndex].penalty +=
            this.contestants[contestantIndex].problems[
              contestantProblemIndex
            ].penalty;
          this.contestants[contestantIndex].totalSolved++;

          this.banClickNext();
        }
      }
    },
    banClickNext() {
      this.isTransitionAnimation = true;
      setTimeout(() => {
        this.isTransitionAnimation = false;
      }, this.nextClickCoolDown + 100);
    },
    findNextProblem() {
      if (this.currentContestantIndex === -1) {
        return;
      }
      this.currentProblemIndex = -1;
      for (let [index, problem] of this.contestants[
        this.currentContestantIndex
      ].problems.entries()) {
        if (problem.haveNextSubmission === true) {
          this.currentProblemIndex = index;
          break;
        }
      }
    },
    getContestData() {
      this.$store.commit("scoreboard/CONTEST", solveContest);
      this.$store.commit("scoreboard/PROBLEMS", getSolveProblems());
      this.$store.commit("scoreboard/CONTESTANTS", getSolveContestants());
      this.$store.commit("scoreboard/SUBMISSIONS", getSolveSubmissionsICPC());
      this.$store.commit("scoreboard/VERDICTS", solveVerdicts);
      this.getScoreboardBeforeFreeze();
      this.currentContestantIndex = this.contestants.length - 1;
      this.sortContestantsICPC();
      this.updateContestantsPosition();
      this.initNextSubmissions();
    },
    ...mapActions({
      setCurrentContestant: "scoreboard/SET_CURRENT_CONTESTANT",
      setCurrentProblem: "scoreboard/SET_CURRENT_PROBLEM",
    }),
  },
  computed: {
    ...mapGetters({
      contest: "scoreboard/CONTEST",
      contestants: "scoreboard/CONTESTANTS",
      submissions: "scoreboard/SUBMISSIONS",
      problems: "scoreboard/PROBLEMS",
      verdicts: "scoreboard/VERDICTS",
      nextClickCoolDown: "scoreboard/NEXT_CLICK_COOL_DOWN",
    }),
  },
});
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
