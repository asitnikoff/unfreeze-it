import Contest from "@/modules/scoreboard/models/Contest";
import Problem from "@/modules/scoreboard/models/Problem";
import Contestant from "@/modules/scoreboard/models/Contestant";
import Submission from "@/modules/scoreboard/models/Submission";
import Verdicts from "@/modules/scoreboard/models/Verdicts";

export default interface ScoreboardState {
    contest: Contest;
    problems: Array<Problem>;
    contestants: Array<Contestant>;
    submissions: Array<Submission>;
    verdicts: Verdicts;
    currentProblem: Problem;
    currentContestant: Contestant;
    currentProblemIndex: number;
    problemHighlightTimer: number;
    nextClickCoolDown: number;
};