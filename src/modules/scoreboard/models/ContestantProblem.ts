export default interface ContestantProblem {
  index: string;
  solved: boolean;
  penalty?: number;
  points?: number;
  firstAccepted: boolean;
  wasAttempt: boolean;
  incorrectAttempts: number;
  lastSubmissionTime: number;
  haveNextSubmission: boolean;
  isPending: boolean;
  isCurrent: boolean;
  isAcceptedAfterFreeze: boolean;
}
