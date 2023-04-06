import { GetterTree } from "vuex";
import ScoreboardGetterEnum from "@/store/modules/scoreboard/types/getter-types";
import Contest from "@/modules/scoreboard/models/Contest";
import Problem from "@/modules/scoreboard/models/Problem";
import Contestant from "@/modules/scoreboard/models/Contestant";
import Submission from "@/modules/scoreboard/models/Submission";
import Verdicts from "@/modules/scoreboard/models/Verdicts";
import ScoreboardState from "@/store/modules/scoreboard/models/ScoreboardState";

const getters: GetterTree<ScoreboardState, any> = {
  [ScoreboardGetterEnum.GET_CONTEST](state): Contest  {
    return state.contest;
  },
  [ScoreboardGetterEnum.GET_PROBLEMS](state): Array<Problem>  {
    return state.problems;
  },
  [ScoreboardGetterEnum.GET_CONTESTANTS](state): Array<Contestant>  {
    return state.contestants;
  },
  [ScoreboardGetterEnum.GET_SUBMISSIONS](state): Array<Submission>  {
    return state.submissions;
  },
  [ScoreboardGetterEnum.GET_VERDICTS](state): Verdicts  {
    return state.verdicts;
  },
  [ScoreboardGetterEnum.GET_CURRENT_PROBLEM](state): Problem  {
    return state.currentProblem;
  },
  [ScoreboardGetterEnum.GET_CURRENT_CONTESTANT](state): Contestant  {
    return state.currentContestant;
  },
  [ScoreboardGetterEnum.GET_CURRENT_PROBLEM_INDEX](state): number  {
    return state.currentProblemIndex;
  },
  // [ScoreboardGetterEnum.GET_PROBLEM_HIGHLIGHT_TIMER](state): number {
  //   return state.problemHighlightTimer;
  // },
  [ScoreboardGetterEnum.GET_CLICK_COOL_DOWN](state): number {
    return state.clickCoolDown;
  },
};

export default getters;