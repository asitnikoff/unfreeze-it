import ScoreboardState from "@/store/modules/scoreboard/models/ScoreboardState";
import Contest from "@/modules/scoreboard/models/Contest";
import Verdicts from "@/modules/scoreboard/models/Verdicts";
import Problem from "@/modules/scoreboard/models/Problem";
import Contestant from "@/modules/scoreboard/models/Contestant";

const state: ScoreboardState = {
    contest: {} as Contest,
    problems: [],
    contestants: [],
    submissions: [],
    verdicts: {} as Verdicts,
    currentProblem: {} as Problem,
    currentContestant: {} as Contestant,
    currentProblemIndex: -1,
    problemHighlightTimer: -1,
    clickCoolDown: 1000,
};

export default state;