import {ActionTree} from "vuex";
import ScoreboardActionEnum from "@/store/modules/scoreboard/types/action-types";
import ScoreboardMutationEnum from "@/store/modules/scoreboard/types/mutation-types";
import ScoreboardState from "@/store/modules/scoreboard/models/ScoreboardState";
import Contestant from "@/modules/scoreboard/models/Contestant";
import Problem from "@/modules/scoreboard/models/Problem";
import Contest from "@/modules/scoreboard/models/Contest";
import Submission from "@/modules/scoreboard/models/Submission";
import Verdicts from "@/modules/scoreboard/models/Verdicts";

const actions: ActionTree<ScoreboardState, any> = {
  // [ScoreboardActionEnum.CLEAR_PROBLEM_HIGHLIGHT_TIMER]({commit, getters}) {
  //   clearInterval(getters.PROBLEM_HIGHLIGHT_TIMER);
  //   commit(ScoreboardMutationEnum.SET_PROBLEM_HIGHLIGHT_TIMER, -1);
  // },
  // [ScoreboardActionEnum.SET_PROBLEM_HIGHLIGHT_TIMER]({commit}, payload: number) {
  //   commit(ScoreboardMutationEnum.SET_PROBLEM_HIGHLIGHT_TIMER, payload);
  // },
  [ScoreboardActionEnum.SET_CURRENT_CONTESTANT]({commit}, payload: Contestant) {
    commit(ScoreboardMutationEnum.SET_CURRENT_CONTESTANT, payload);
  },
  [ScoreboardActionEnum.SET_CURRENT_PROBLEM]({commit}, payload: Problem) {
    commit(ScoreboardMutationEnum.SET_CURRENT_PROBLEM, payload);
  },
  [ScoreboardActionEnum.SET_CONTEST]({commit}, payload: Contest) {
    commit(ScoreboardMutationEnum.SET_CONTEST, payload);
  },
  [ScoreboardActionEnum.SET_PROBLEMS]({commit}, payload: Array<Problem>) {
    commit(ScoreboardMutationEnum.SET_PROBLEMS, payload);
  },
  [ScoreboardActionEnum.SET_CONTESTANTS]({commit}, payload: Array<Contestant>) {
    commit(ScoreboardMutationEnum.SET_CONTESTANTS, payload);
  },
  [ScoreboardActionEnum.SET_SUBMISSIONS]({commit}, payload: Array<Submission>) {
    commit(ScoreboardMutationEnum.SET_SUBMISSIONS, payload);
  },
  [ScoreboardActionEnum.SET_VERDICTS]({commit}, payload: Verdicts) {
    commit(ScoreboardMutationEnum.SET_VERDICTS, payload);
  },
};

export default actions;