export default interface Submission {
  timeSubmitted: number;
  contestantName: string;
  problemIndex: string;
  verdict: string;
  points?: number;
}
