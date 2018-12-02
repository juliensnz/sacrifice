import {GameState} from 'src/core/reducer';
import {getSelectedVillagers} from 'src/core/reducer/villager';
import parameters from 'src/core/parameters';
import {getRandomArray} from 'src/core/utils';
import {endGame} from 'src/core/action';

export const startCycle = () => (dispatch: any) => {
  dispatch({type: 'START_CYCLE'});
  dispatch({type: 'PLAY_SOUND', sound: 'ambient_loop'});
};

export const endCycle = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'REGISTER_GAME_EVENT', gameEvent: getRandomArray(getState().possibleEvents)});

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

const factAnnouncement = () => (dispatch: any, getState: () => GameState) => {
  dispatch({
    type: 'FACT_ANNOUNCEMENT',
    event: getState().currentEvent,
  });
};
