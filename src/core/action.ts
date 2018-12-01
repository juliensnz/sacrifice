import {GameState, Event} from 'src/core/reducer';
import parameters from 'src/core/parameters';
import events from 'src/events';
import {getRandomArray} from 'src/core/utils';

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

export const startCycle = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'START_CYCLE'});
};

export const factConfirmation = () => (dispatch: any, getState: () => GameState) => {
  dispatch(startCycle());
  dispatch(resume());
};

const endCycle = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'USER_EVENT', event: getRandomEvent()});
  dispatch({type: 'END_CYCLE'});
  dispatch(factAnnouncement());

  if (getState().cycle.number === parameters.cycleCount) {
    dispatch(endGame());
  }
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

const factAnnouncement = () => (dispatch: any, getState: () => GameState) => {
  dispatch({
    type: 'FACT_ANNOUNCEMENT',
    message: getState().events.map((event: Event) => `${event.fact} ${event.consequence}`),
  });
};

export const selectionStart = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'SELECTION_START'});
};

const whatToDo = () => (dispatch: any, getState: () => GameState) => {
  dispatch(makeVillagerSpeak());

  if (parameters.cycleLength === getState().cycle.time) {
    dispatch(endCycle());
  }

  if (parameters.cycleLength - parameters.selectionLength === getState().cycle.time) {
    dispatch(selectionAnnouncement());
  }
};

const makeVillagerSpeak = () => (dispatch: any, getState: () => GameState) => {
  const villager = getRandomArray(getState().villagers);

  const faithLevel = Math.abs(villager.faith - 50);
  const trustLevel = Math.abs(villager.trust - 50);

  if (faithLevel > trustLevel) {
  } else {
  }
};

const getRandomEvent = () => {
  const event = getRandomArray(events.events);

  return {
    type: event.type,
    fact: getRandomArray(event.facts),
    ...getRandomArray(event.consequences),
  };
};
