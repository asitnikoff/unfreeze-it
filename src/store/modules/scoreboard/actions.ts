import {ActionTree} from "vuex";
import ScoreboardState from "@/store/modules/scoreboard/models/ScoreboardState";
import Contestant from "@/modules/scoreboard/models/Contestant";
import Problem from "@/modules/scoreboard/models/Problem";

const actions: ActionTree<ScoreboardState, any> = {
  CLEAR_PROBLEM_HIGHLIGHT_TIMER: ({commit, getters}) => {
    clearInterval(getters.PROBLEM_HIGHLIGHT_TIMER);
    commit("PROBLEM_HIGHLIGHT_TIMER", -1);
  },
  SET_PROBLEM_HIGHLIGHT_TIMER: ({commit}, payload: number) => {
    commit("PROBLEM_HIGHLIGHT_TIMER", payload);
  },
  SET_CURRENT_CONTESTANT: ({commit}, payload: Contestant) => {
    commit("CURRENT_CONTESTANT", payload);
  },
  SET_CURRENT_PROBLEM: ({commit}, payload: Problem) => {
    commit("CURRENT_PROBLEM", payload);
  },
};

export default actions;