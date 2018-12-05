import {GameState} from 'src/core/reducer';
import {getSelectedVillagers} from 'src/core/reducer/villager';
import parameters from 'src/core/parameters';
import {getRandomArray, getTrust, getFaith} from 'src/core/utils';
import {endGame} from 'src/core/action';
import {Cycle, GameEvent, Villager} from 'src/core/model';
import {possibleEvents} from 'src/core/action/events';

export const startCycle = () => (dispatch: any) => {
  dispatch({type: 'START_CYCLE'});
  dispatch({type: 'PLAY_SOUND', sound: 'ambient_loop'});
};

export const endCycle = () => (dispatch: any, getState: () => GameState) => {
  const alreadyHappenedEventIds = getState().previousCycles.map(
    (cycle: Cycle): string | null => (null === cycle.gameEvent ? null : cycle.gameEvent.id)
  );
  const neverHappenedEvents = possibleEvents.filter(
    (event: GameEvent) => -1 === alreadyHappenedEventIds.indexOf(event.id)
  );
  const eventChoices = neverHappenedEvents.length > 0 ? neverHappenedEvents : possibleEvents;
  dispatch({type: 'REGISTER_GAME_EVENT', gameEvent: getRandomArray(eventChoices)});

  const numberOfSacrificed = getSelectedVillagers(getState().villagers).length;
  const getAliveVillagers = (villagers: Villager[]) => villagers.filter((villager: Villager) => villager.alive);

  dispatch({type: 'END_CYCLE'});
  dispatch({type: 'PLAY_SOUND', sound: 0 === numberOfSacrificed ? 'no_sacrifice' : 'sacrifice'});

  const aliveVillagers = getAliveVillagers(getState().villagers);
  const trustLevel = getTrust(aliveVillagers);
  const faithLevel = getFaith(aliveVillagers);

  setTimeout(() => {
    dispatch(factAnnouncement());

    if (aliveVillagers.length === 0) {
      dispatch(endGame('all_villagers_sacrificed'));
    } else if (trustLevel === 0) {
      dispatch(endGame('no_more_trust'));
    } else if (faithLevel === 0) {
      dispatch(endGame('no_more_faith'));
    }
  }, 1000 * parameters.timeToDisplayAnnouncement);
};

const factAnnouncement = () => (dispatch: any, getState: () => GameState) => {
  dispatch({
    type: 'CYCLE_FACT_ANNOUNCEMENT_START',
    event: getState().cycle.gameEvent,
  });
};
