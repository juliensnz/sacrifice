import {Decision} from 'src/core/model';

export const startDecision = (decision: Decision) => ({
  type: 'DECISION_START',
  decision,
});
export const decisionConfirmation = (choice: string) => ({
  type: 'DECISION_CONFIRMATION',
  choice,
});
