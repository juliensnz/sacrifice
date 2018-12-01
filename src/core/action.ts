import {GameState} from 'src/core/reducer';
import parameters from 'src/core/parameters';

export const startGame = () => (dispatch: any, getState: () => GameState) => {
  dispatch(startCycle());
  setInterval(() => {
    if (!getState().paused) {
      dispatch(tick());
    }
  }, 1000);
};

const endGame = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'END_GAME'});
};

const startCycle = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'START_CYCLE'});
};

const endCycle = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'END_CYCLE'});

  if (getState().cycle.number === parameters.cycleCount) {
    dispatch(endGame());
  }
  dispatch(startCycle());
};

const tick = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'TICK'});

  dispatch(whatToDo());
};

export const toggleSacrificed = (id: string) => ({
  type: 'TOGGLE_SACRIFICED',
  id,
});

export const pause = () => ({
  type: 'PAUSE',
});

export const resume = () => ({
  type: 'RESUME',
});

const selectionAnnouncement = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'SELECTION_ANNOUNCEMENT', message: "hey! that's selection time!"});
};

export const selectionStart = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'SELECTION_START'});
};

const whatToDo = () => (dispatch: any, getState: () => GameState) => {
  if (parameters.cycleLength === getState().cycle.time) {
    dispatch(endCycle());
  }

  if (parameters.cycleLength - parameters.selectionLength === getState().cycle.time) {
    dispatch(selectionAnnouncement());
  }
};
