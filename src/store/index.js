import { createStore } from "vuex";
import scoreboard from "./modules/scoreboard/index.js";

export const store = createStore({
  modules: {
    scoreboard,
  },
});
