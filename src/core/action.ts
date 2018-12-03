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
  type: 'DISMISS_FACT',
});

export const dismissDecision = () => ({
  type: 'DISMISS_DECISION',
});

export const letterStart = () => ({
  type: 'LETTER_START',
});

export const letterConfirmation = () => ({
  type: 'LETTER_CONFIRMATION',
});

export const gameplayStart = () => ({
  type: 'GAMEPLAY_START',
});

export const gameplayConfirmation = () => ({
  type: 'GAMEPLAY_CONFIRMATION',
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
    type: 'SELECTION_START',
  };
};
