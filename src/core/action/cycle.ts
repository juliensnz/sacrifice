import {GameState, GameEvent} from 'src/core/reducer';
import {getSelectedVillagers} from 'src/core/reducer/villager';
import parameters from 'src/core/parameters';
import {getRandomArray} from 'src/core/utils';
import events from 'src/data/events';
import {endGame} from 'src/core/action';

export const startCycle = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'START_CYCLE'});
  dispatch({type: 'PLAY_SOUND', sound: 'ambient_loop'});
};

export const endCycle = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'REGISTER_GAME_EVENT', gameEvent: getRandomEvent()});

  const numberOfSacrificed = getSelectedVillagers(getState().villagers).length;
  dispatch({type: 'PLAY_SOUND', sound: 0 === numberOfSacrificed ? 'no_sacrifice' : 'sacrifice'});
  dispatch({type: 'END_CYCLE'});
  if (getState().cycle.number === parameters.cycleCount) {
    dispatch(endGame());
  } else {
    setTimeout(() => {
      dispatch(factAnnouncement());
    }, 1000 * parameters.timeToDisplayAnnouncement);
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

const factAnnouncement = () => (dispatch: any, getState: () => GameState) => {
  dispatch({
    type: 'FACT_ANNOUNCEMENT',
    message: getState().gameEvents.map((gameEvent: GameEvent) => `${gameEvent.fact} ${gameEvent.consequence}`),
  });
};
