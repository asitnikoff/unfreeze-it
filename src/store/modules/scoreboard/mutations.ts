import {MutationTree} from "vuex";
import ScoreboardMutationEnum from "@/store/modules/scoreboard/types/mutation-types";
import ScoreboardState from "@/store/modules/scoreboard/models/ScoreboardState";
import Contest from "@/modules/scoreboard/models/Contest";
import Problem from "@/modules/scoreboard/models/Problem";
import Contestant from "@/modules/scoreboard/models/Contestant";
import Submission from "@/modules/scoreboard/models/Submission";
import Verdicts from "@/modules/scoreboard/models/Verdicts";

const mutations: MutationTree<ScoreboardState> = {
    [ScoreboardMutationEnum.SET_CONTEST](state, payload: Contest) {
        state.contest = payload;
    },
    [ScoreboardMutationEnum.SET_PROBLEMS](state, payload: Array<Problem>)  {
        state.problems = payload;
    },
    [ScoreboardMutationEnum.SET_CONTESTANTS](state, payload: Array<Contestant>)  {
        state.contestants = payload;
    },
    [ScoreboardMutationEnum.SET_SUBMISSIONS](state, payload: Array<Submission>)  {
        state.submissions = payload;
    },
    [ScoreboardMutationEnum.SET_VERDICTS](state, payload: Verdicts)  {
        state.verdicts = payload;
    },
    [ScoreboardMutationEnum.SET_CURRENT_PROBLEM](state, payload: Problem)  {
        state.currentProblem = payload;
    },
    [ScoreboardMutationEnum.SET_CURRENT_CONTESTANT](state, payload: Contestant)  {
        state.currentContestant = payload;
    },
    [ScoreboardMutationEnum.SET_CURRENT_PROBLEM_INDEX](state, payload: number)  {
        state.currentProblemIndex = payload;
    },
    [ScoreboardMutationEnum.SET_PROBLEM_HIGHLIGHT_TIMER](state, payload: number) {
        state.problemHighlightTimer = payload;
    },
}

export default mutations;