import { GetterTree } from "vuex";
import * as types from "@/store/modules/scoreboard/types/getter-types";
import Contest from "@/modules/scoreboard/models/Contest";
import Problem from "@/modules/scoreboard/models/Problem";
import Contestant from "@/modules/scoreboard/models/Contestant";
import Submission from "@/modules/scoreboard/models/Submission";
import Verdicts from "@/modules/scoreboard/models/Verdicts";
import ScoreboardState from "@/store/modules/scoreboard/models/ScoreboardState";

const getters: GetterTree<ScoreboardState, any> = {
  [types.CONTEST](state): Contest  {
    return state.contest;
  },
  [types.PROBLEMS](state): Array<Problem>  {
    return state.problems;
  },
  [types.CONTESTANTS](state): Array<Contestant>  {
    return state.contestants;
  },
  [types.SUBMISSIONS](state): Array<Submission>  {
    return state.submissions;
  },
  [types.VERDICTS](state): Verdicts  {
    return state.verdicts;
  },
  [types.CURRENT_PROBLEM](state): Problem  {
    return state.currentProblem;
  },
  [types.CURRENT_CONTESTANT](state): Contestant  {
    return state.currentContestant;
  },
  [types.CURRENT_PROBLEM_INDEX](state): number  {
    return state.currentProblemIndex;
  },
  [types.PROBLEM_HIGHLIGHT_TIMER](state): number {
    return state.problemHighlightTimer;
  },
  [types.CLICK_COOL_DOWN](state): number {
    return state.clickCoolDown;
  },
};

export default getters;