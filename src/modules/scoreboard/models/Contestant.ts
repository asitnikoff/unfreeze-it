import type ContestantProblem from "./ContestantProblem";

export default interface Contestant {
  id: number;
  position: number;
  title: string;
  problems: Array<ContestantProblem>;
  totalSolved?: number;
  penalty?: number;
  points?: number;
}
