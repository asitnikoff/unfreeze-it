import { Module } from "vuex";
import getters from "@/store/modules/scoreboard/getters";
import state from "@/store/modules/scoreboard/state";
import mutations from "@/store/modules/scoreboard/mutations";
import actions from "@/store/modules/scoreboard/actions";

const scoreboard: Module<any, any> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default scoreboard;