import {GameState} from 'src/core/reducer';

export const startGame = () => (dispatch: any, getState: () => GameState) => {
  dispatch(startCycle());
};

const startCycle = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'START_CYCLE'});
  setInterval(() => {
    dispatch(tick());
  }, 1000);
};

const endCycle = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'END_CYCLE'});
};

const tick = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'TICK'});

  dispatch(whatToDo());
};

const CYCLE_LENGTH = 30;

const whatToDo = () => (dispatch: any, getState: () => GameState) => {
  if (CYCLE_LENGTH === getState().cycle.time) {
    dispatch(endCycle());
  }
};
