import {GameState} from 'src/core/reducer';
import {getSelectedVillagers} from 'src/core/reducer/villager';
import parameters from 'src/core/parameters';
import {getRandomArray, getTrust, getFaith} from 'src/core/utils';
import {endGame} from 'src/core/action';
import {possibleEvents} from 'src/core/reducer/events';
import {Villager} from '../model';

export const startCycle = () => (dispatch: any) => {
  dispatch({type: 'START_CYCLE'});
  dispatch({type: 'PLAY_SOUND', sound: 'ambient_loop'});
};

export const endCycle = () => (dispatch: any, getState: () => GameState) => {
  dispatch({type: 'REGISTER_GAME_EVENT', gameEvent: getRandomArray(possibleEvents)});

  const numberOfSacrificed = getSelectedVillagers(getState().villagers).length;
  dispatch({type: 'PLAY_SOUND', sound: 0 === numberOfSacrificed ? 'no_sacrifice' : 'sacrifice'});
  dispatch({type: 'END_CYCLE'});

  const getAliveVillagers = (villagers: Villager[]) => villagers.filter((villager: Villager) => villager.alive);
  const aliveVillagers = getAliveVillagers(getState().villagers);
  const trustLevel = getTrust(aliveVillagers);
  const faithLevel = getFaith(aliveVillagers);

  setTimeout(() => {
    dispatch(factAnnouncement());

    if (aliveVillagers.length === 0) {
      dispatch(endGame());
    } else if (trustLevel === 0) {
      dispatch(endGame());
    } else if (faithLevel === 0) {
      dispatch(endGame());
    }
  }, 1000 * parameters.timeToDisplayAnnouncement);
};

const factAnnouncement = () => (dispatch: any, getState: () => GameState) => {
  dispatch({
    type: 'FACT_ANNOUNCEMENT',
    event: getState().cycle.gameEvent,
  });
};
