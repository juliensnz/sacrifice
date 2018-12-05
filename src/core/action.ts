import {GameState} from 'src/core/reducer';
import {tick} from 'src/core/action/tick';
import {startCycle} from 'src/core/action/cycle';

export const startGame = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'START_GAME'});
  dispatch(startCycle());
  setInterval(() => {
    if (!getState().paused) {
      dispatch(tick());
    }
  }, 1000);
};

export const endGame = (reason: string) => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'END_GAME', reason});
};

export const factConfirmation = () => (dispatch: any, getState: () => GameState) => {
  dispatch(dismissFact());
  if (getState().gameover === null) {
    dispatch(startCycle());
    dispatch(resume());
  }
};

const dismissFact = () => ({
  type: 'CYCLE_FACT_ANNOUNCEMENT_DISMISS',
});

export const dismissDecision = () => ({
  type: 'DECISION_CONSEQUENCE_DISMISS',
});

export const letterStart = () => ({
  type: 'ANONYMOUS_LETTER_DISPLAY_START',
});

export const letterConfirmation = () => ({
  type: 'ANONYMOUS_LETTER_DISMISS',
});

export const gameplayStart = () => ({
  type: 'GAMEPLAY_TUTORIAL_START',
});

export const gameplayConfirmation = () => ({
  type: 'GAMEPLAY_TUTORIAL_DISMISS',
});

export const toggleSacrificed = (id: string) => ({
  type: 'TOGGLE_SACRIFICED',
  id,
});

export const resume = () => ({
  type: 'RESUME',
});

export const selectionStart = () => {
  return {
    type: 'SELECTION_PHASE_START',
  };
};
