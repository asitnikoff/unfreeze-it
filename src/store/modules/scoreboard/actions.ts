import {ActionTree} from "vuex";
import * as types from "@/store/modules/scoreboard/types/action-types";
import ScoreboardState from "@/store/modules/scoreboard/models/ScoreboardState";
import Contestant from "@/modules/scoreboard/models/Contestant";
import Problem from "@/modules/scoreboard/models/Problem";

const actions: ActionTree<ScoreboardState, any> = {
  [types.CLEAR_PROBLEM_HIGHLIGHT_TIMER]({commit, getters}) {
    clearInterval(getters.PROBLEM_HIGHLIGHT_TIMER);
    commit("PROBLEM_HIGHLIGHT_TIMER", -1);
  },
  [types.SET_PROBLEM_HIGHLIGHT_TIMER]({commit}, payload: number) {
    commit("PROBLEM_HIGHLIGHT_TIMER", payload);
  },
  [types.SET_CURRENT_CONTESTANT]({commit}, payload: Contestant) {
    commit("CURRENT_CONTESTANT", payload);
  },
  [types.SET_CURRENT_PROBLEM]({commit}, payload: Problem) {
    commit("CURRENT_PROBLEM", payload);
  },
};

export default actions;