import {Decision} from 'src/core/model';

export const startDecision = (decision: Decision) => ({
  type: 'DECISION_DISPLAY_START',
  decision,
});
export const decisionConfirmation = (choice: string) => ({
  type: 'DECISION_CONFIRMATION',
  choice,
});
