import {createStore, Store} from "vuex";
import scoreboard from "@/store/modules/scoreboard";

const store: Store<any> = createStore({
  modules: {
    scoreboard,
  },
});

export default store;
