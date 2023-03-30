import {MutationTree} from "vuex";
import * as types from "@/store/modules/scoreboard/types/mutation-types";
import ScoreboardState from "@/store/modules/scoreboard/models/ScoreboardState";
import Contest from "@/modules/scoreboard/models/Contest";
import Problem from "@/modules/scoreboard/models/Problem";
import Contestant from "@/modules/scoreboard/models/Contestant";
import Submission from "@/modules/scoreboard/models/Submission";
import Verdicts from "@/modules/scoreboard/models/Verdicts";

const mutations: MutationTree<ScoreboardState> = {
    [types.CONTEST](state, payload: Contest) {
        state.contest = payload;
    },
    [types.PROBLEMS](state, payload: Array<Problem>)  {
        state.problems = payload;
    },
    [types.CONTESTANTS](state, payload: Array<Contestant>)  {
        state.contestants = payload;
    },
    [types.SUBMISSIONS](state, payload: Array<Submission>)  {
        state.submissions = payload;
    },
    [types.VERDICTS](state, payload: Verdicts)  {
        state.verdicts = payload;
    },
    [types.CURRENT_PROBLEM](state, payload: Problem)  {
        state.currentProblem = payload;
    },
    [types.CURRENT_CONTESTANT](state, payload: Contestant)  {
        state.currentContestant = payload;
    },
    [types.CURRENT_PROBLEM_INDEX](state, payload: number)  {
        state.currentProblemIndex = payload;
    },
    [types.PROBLEM_HIGHLIGHT_TIMER](state, payload: number) {
        state.problemHighlightTimer = payload;
    },
}

export default mutations;