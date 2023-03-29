import {MutationTree} from "vuex";
import ScoreboardState from "@/store/modules/scoreboard/models/ScoreboardState";
import Contest from "@/modules/scoreboard/models/Contest";
import Problem from "@/modules/scoreboard/models/Problem";
import Contestant from "@/modules/scoreboard/models/Contestant";
import Submission from "@/modules/scoreboard/models/Submission";
import Verdicts from "@/modules/scoreboard/models/Verdicts";

const mutations: MutationTree<ScoreboardState> = {
    CONTEST: (state, payload: Contest) => {
        state.contest = payload;
    },
    PROBLEMS: (state, payload: Array<Problem>) => {
        state.problems = payload;
    },
    CONTESTANTS: (state, payload: Array<Contestant>) => {
        state.contestants = payload;
    },
    SUBMISSIONS: (state, payload: Array<Submission>) => {
        state.submissions = payload;
    },
    VERDICTS: (state, payload: Verdicts) => {
        state.verdicts = payload;
    },
    CURRENT_PROBLEM: (state, payload: Problem) => {
        state.currentProblem = payload;
    },
    CURRENT_CONTESTANT: (state, payload: Contestant) => {
        state.currentContestant = payload;
    },
    CURRENT_PROBLEM_INDEX: (state, payload: number) => {
        state.currentProblemIndex = payload;
    },
    PROBLEM_HIGHLIGHT_TIMER: (state, payload: number) => {
        state.problemHighlightTimer = payload;
    },
}

export default mutations;