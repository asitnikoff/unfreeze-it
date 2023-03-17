import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      contest: {},
      currentProblem: {},
      currentContestant: {},
      currentContestantIndex: -1,
      currentProblemIndex: -1,
      problemHighlightTimer: -1,
    };
  },
  getters: {
    CONTEST: (state) => {
      return state.contest;
    },
    CURRENT_PROBLEM: (state) => {
      return state.currentProblem;
    },
    CURRENT_CONTESTANT: (state) => {
      return state.currentContestant;
    },
    CURRENT_CONTESTANT_INDEX: (state) => {
      return state.currentContestantIndex;
    },
    CURRENT_PROBLEM_INDEX: (state) => {
      return state.currentProblemIndex;
    },
    PROBLEM_HIGHLIGHT_TIMER: (state) => {
      return state.problemHighlightTimer;
    },
  },
  mutations: {
    CONTEST: (state, payload) => {
      state.contest = payload;
    },
    CURRENT_PROBLEM: (state, payload) => {
      state.currentProblem = payload;
    },
    CURRENT_CONTESTANT: (state, payload) => {
      state.currentContestant = payload;
    },
    CURRENT_CONTESTANT_INDEX: (state, payload) => {
      state.currentContestantIndex = payload;
    },
    CURRENT_PROBLEM_INDEX: (state, payload) => {
      state.currentProblemIndex = payload;
    },
    PROBLEM_HIGHLIGHT_TIMER: (state, payload) => {
      state.problemHighlightTimer = payload;
    },
  },
  actions: {
    CLEAR_PROBLEM_HIGHLIGHT_TIMER: (context) => {
      clearInterval(context.getters.PROBLEM_HIGHLIGHT_TIMER);
      context.commit("PROBLEM_HIGHLIGHT_TIMER", -1);
    },
    SET_PROBLEM_HIGHLIGHT_TIMER: (context, payload) => {
      context.commit("PROBLEM_HIGHLIGHT_TIMER", payload);
    },
  },
});
