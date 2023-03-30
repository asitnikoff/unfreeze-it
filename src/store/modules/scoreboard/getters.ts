import { GetterTree } from "vuex";
import Contest from "@/modules/scoreboard/models/Contest";
import Problem from "@/modules/scoreboard/models/Problem";
import Contestant from "@/modules/scoreboard/models/Contestant";
import Submission from "@/modules/scoreboard/models/Submission";
import Verdicts from "@/modules/scoreboard/models/Verdicts";
import ScoreboardState from "@/store/modules/scoreboard/models/ScoreboardState";

const getters: GetterTree<ScoreboardState, any> = {
  CONTEST: (state): Contest => {
    return state.contest;
  },
  PROBLEMS: (state): Array<Problem> => {
    return state.problems;
  },
  CONTESTANTS: (state): Array<Contestant> => {
    return state.contestants;
  },
  SUBMISSIONS: (state): Array<Submission> => {
    return state.submissions;
  },
  VERDICTS: (state): Verdicts => {
    return state.verdicts;
  },
  CURRENT_PROBLEM: (state): Problem => {
    return state.currentProblem;
  },
  CURRENT_CONTESTANT: (state): Contestant => {
    return state.currentContestant;
  },
  CURRENT_PROBLEM_INDEX: (state): number => {
    return state.currentProblemIndex;
  },
  PROBLEM_HIGHLIGHT_TIMER: (state): number => {
    return state.problemHighlightTimer;
  },
  CLICK_COOL_DOWN: (state): number => {
    return state.clickCoolDown;
  },
};

export default getters;


/*
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
    return state.clickCoolDown;
  },
};
*/
