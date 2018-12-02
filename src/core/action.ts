import {GameState} from 'src/core/reducer';
import {tick} from 'src/core/action/tick';
import {startCycle} from 'src/core/action/cycle';

export const startGame = () => (dispatch: any, getState: () => GameState) => {
  dispatch(startCycle());
  setInterval(() => {
    if (!getState().paused) {
      dispatch(tick());
    }
  }, 1000);
};

export const endGame = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'END_GAME'});
};

export const factConfirmation = () => (dispatch: any, getState: () => GameState) => {
  dispatch(startCycle());
  dispatch(resume());
};

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
