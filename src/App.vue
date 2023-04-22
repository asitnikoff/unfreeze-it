<template>
  <div id="app">
    <Scoreboard
      ref="scoreboard"
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
      :isAccepted="isAccepted"
    ></Scoreboard>
  </div>
</template>

<script lang="ts">
import ScoreboardActionEnum from "@/store/modules/scoreboard/types/action-types";
import ScoreboardGetterEnum from "@/store/modules/scoreboard/types/getter-types";
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
  setup() {
    document.title = "BSUIR Open XI. Scoreboard";
  },
  name: "app",
  data() {
    return {
      currentContestantIndex: -1 as number,
      currentProblemIndex: -1 as number,
      allClicked: false as boolean,
      isTransitionAnimation: false as boolean,
      isCurrentlyPending: false as boolean,
      currentContestantProblem: {} as ContestantProblem,
      isAccepted: false as boolean,
      isBanClickNext: false as boolean,
    };
  },
  created() {
    // document.title = "Scoreboard";
    this.getContestData();
  },
  mounted() {
    // this.scrollToCurrentContestant();
  },
  components: {
    Scoreboard,
  },
  methods: {
    setCurrentContestantProblem(value: ContestantProblem) {
      if (this.currentContestantProblem.index !== value.index) {
        this.currentContestantProblem.isCurrent = false;
      }
      this.currentContestantProblem = value;
      this.currentContestantProblem.isCurrent = true;
    },
    handleKeyPress(event: KeyboardEvent) {
      switch (event.key) {
        case "n":
          this.isAccepted = false;
          console.log("next clicked");
          if (
            this.isTransitionAnimation === true ||
            this.isBanClickNext === true ||
            this.currentContestantIndex === -1
          ) {
            break;
          }
          // this.isBanClickNext = true;
          // setTimeout(() => {
          //   this.isBanClickNext = false;
          //   console.log("ban on next click is false");
          // }, 100);
          console.log("next event is proceeding");
          this.findNextProblem();
          this.setCurrentProblem(
            this.currentProblemIndex === -1
              ? {}
              : this.problems[this.currentProblemIndex]
          );
          this.setCurrentContestantProblem(
            this.currentProblemIndex === -1 ||
              this.currentContestantIndex === -1
              ? {}
              : this.contestants[this.currentContestantIndex].problems[
                  this.currentProblemIndex
                ]
          );
          if (this.currentProblemIndex !== -1) {
            let contestant = this.contestants[this.currentContestantIndex];
            let submission = this.getNextSubmission(
              contestant,
              contestant.problems[this.currentProblemIndex]
            );
            if (this.isCurrentlyPending) {
              this.isCurrentlyPending = false;
              this.revealSubmission(submission);
              if (this.isAccepted) {
                this.banClickNext();
                this.isAccepted = false;
                this.currentContestantProblem.isAcceptedAfterFreeze = true;
              }
            } else {
              this.isCurrentlyPending = true;
              break;
            }
            this.updateNextSubmission(
              contestant,
              this.currentContestantProblem
            );
          } else {
            this.currentContestantIndex--;
            this.setCurrentContestant(
              this.currentContestantIndex === -1
                ? {}
                : this.contestants[this.currentContestantIndex]
            );
          }
          break;
        //   case "a":
        //     if (this.allClicked === false) {
        //       this.allClicked = true;
        //       this.revealAll();
        //     }
        //     break;
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
        } else {
          this.currentContestantIndex--;
        }
        this.findNextProblem();
      }
      console.log(
        `after revealAll contestant index equals ${this.currentContestantIndex}`
      );
      this.scrollToCurrentContestant();
    },
    scrollToCurrentContestant() {
      setTimeout(() => {
        if (this.$refs["scoreboard"] !== undefined) {
          console.log(
            "trigger scrollToCurrentContestant from updateScoreboard"
          );
          (this.$refs["scoreboard"] as any).scrollToCurrentContestant(
            this.currentContestantIndex
          );
        }
      }, 100);
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
          --i;
        } else {
          break;
        }
      }
    },
    updateScoreboard() {
      // this.sortContestantsICPC();
      this.shiftContestant();
      this.updateContestantsPosition();
      // console.log(this.$refs["scoreboard"] as Object);
    },
    getNextSubmission(
      contestant: Contestant,
      contestantProblem: ContestantProblem
    ) {
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
          this.currentContestantProblem
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
          this.isAccepted = true;
          this.updateScoreboard();
        }
      }
    },
    banClickNext() {
      this.isTransitionAnimation = true;

      this.scrollToCurrentContestant();

      setTimeout(() => {
        this.isTransitionAnimation = false;
      }, this.clickCoolDown + 100);
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
          // if (this.currentProblemIndex !== index && this.currentProblemIndex !== -1) {
          //   this.contestants[this.currentContestantIndex].problems[this.currentProblemIndex].isPending = false;
          // }
          this.currentProblemIndex = index;
          break;
        }
      }
    },
    getContestData() {
      this.setContest(solveContest);
      this.setProblems(getSolveProblems());
      this.setContestants(getSolveContestants());
      this.setSubmissions(getSolveSubmissionsICPC());
      this.setVerdicts(solveVerdicts);
      this.getScoreboardBeforeFreeze();
      this.currentContestantIndex = this.contestants.length - 1;
      this.sortContestantsICPC();
      this.updateContestantsPosition();
      this.initNextSubmissions();
    },
    ...mapActions("scoreboard", {
      setCurrentContestant: ScoreboardActionEnum.SET_CURRENT_CONTESTANT,
      setCurrentProblem: ScoreboardActionEnum.SET_CURRENT_PROBLEM,
      setContest: ScoreboardActionEnum.SET_CONTEST,
      setProblems: ScoreboardActionEnum.SET_PROBLEMS,
      setContestants: ScoreboardActionEnum.SET_CONTESTANTS,
      setSubmissions: ScoreboardActionEnum.SET_SUBMISSIONS,
      setVerdicts: ScoreboardActionEnum.SET_VERDICTS,
    }),
  },
  computed: {
    ...mapGetters("scoreboard", {
      contest: ScoreboardGetterEnum.GET_CONTEST,
      contestants: ScoreboardGetterEnum.GET_CONTESTANTS,
      submissions: ScoreboardGetterEnum.GET_SUBMISSIONS,
      problems: ScoreboardGetterEnum.GET_PROBLEMS,
      verdicts: ScoreboardGetterEnum.GET_VERDICTS,
      clickCoolDown: ScoreboardGetterEnum.GET_CLICK_COOL_DOWN,
    }),
    // currentContestantProblem(): ContestantProblem {
    //   return this.contestants[this.currentContestantIndex].problems[
    //     this.currentProblemIndex
    //   ];
    // },
  },
  watch: {
    currentProblemIndex(newValue: number, oldValue: number) {
      // console.log("currentProblemIndex changed");
      // if (newValue === -1) {
      //   if (oldValue !== -1 && this.currentContestantIndex !== -1) {
      //     this.contestants[this.currentContestantIndex].problems[
      //       oldValue
      //     ].isCurrent = false;
      //     console.log("isCurrent false");
      //   }
      // } else {
      //   this.contestants[this.currentContestantIndex].problems[
      //     newValue
      //   ].isCurrent = true;
      //   console.log("isCurrent true");
      // }
    },
    isCurrentlyPending(newValue: boolean) {
      if (!newValue) {
        this.currentContestantProblem.isPending = false;
        console.log(`isCurrentlyPending changed on false`);
      } else {
        this.currentContestantProblem.isPending = true;
        console.log(`isCurrentlyPending changed on true`);
      }
    },
  },
});
</script>

<style>
/* oswald-regular - cyrillic_latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: "Oswald";
  font-style: normal;
  font-weight: 400;
  src: url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-regular.eot"); /* IE9 Compat Modes */
  src: url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-regular.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-regular.woff2")
      format("woff2"),
    /* Super Modern Browsers */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-regular.woff")
      format("woff"),
    /* Modern Browsers */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-regular.ttf")
      format("truetype"),
    /* Safari, Android, iOS */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-regular.svg#Oswald")
      format("svg"); /* Legacy iOS */
}
/* oswald-500 - cyrillic_latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: "Oswald";
  font-style: normal;
  font-weight: 500;
  src: url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-500.eot"); /* IE9 Compat Modes */
  src: url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-500.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-500.woff2")
      format("woff2"),
    /* Super Modern Browsers */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-500.woff")
      format("woff"),
    /* Modern Browsers */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-500.ttf")
      format("truetype"),
    /* Safari, Android, iOS */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-500.svg#Oswald")
      format("svg"); /* Legacy iOS */
}
/* oswald-600 - cyrillic_latin */
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: "Oswald";
  font-style: normal;
  font-weight: 600;
  src: url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-600.eot"); /* IE9 Compat Modes */
  src: url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-600.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-600.woff2")
      format("woff2"),
    /* Super Modern Browsers */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-600.woff")
      format("woff"),
    /* Modern Browsers */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-600.ttf")
      format("truetype"),
    /* Safari, Android, iOS */
      url("@/assets/fonts/oswald/oswald-v49-cyrillic_latin-600.svg#Oswald")
      format("svg"); /* Legacy iOS */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Oswald", sans-serif;
  font-size: 40px;
}

*::-webkit-scrollbar {
  display: none;
}

#app {
  padding: 10px;
  background-color: #f3e1b8;
}

.app__scoreboard:focus {
  outline: none;
}
</style>
