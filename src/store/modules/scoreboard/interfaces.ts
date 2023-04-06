import ContestantProblem from "@/modules/scoreboard/models/ContestantProblem";

export namespace ScoreboardInterfaces {
    export interface IContestantProblem {
        contestantIndex: number,
        problemIndex: number,
        problemData: ContestantProblem,
    }
}

export default ScoreboardInterfaces;