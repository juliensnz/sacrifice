import parameters from 'src/core/parameters';
import {GameState} from 'src/core/reducer';
import {Villager} from 'src/core/model';
import {getRandomArray, getAliveVillagers} from 'src/core/utils';
import {endCycle} from 'src/core/action/cycle';
import {MessagesGenerators} from 'src/core/action/message';
import {selectionAnnouncement} from 'src/core/action/announcement';
import {startDecision} from 'src/core/action/decision';

export const tick = () => (dispatch: any) => {
  dispatch({type: 'TICK'});

  dispatch(whatToDo());
};

const whatToDo = () => (dispatch: any, getState: () => GameState) => {
  dispatch(makeVillagerSpeak());

  // DISPLAY DECISION QUESTION AFTER A PREVIOUS CYCLE GAME EVENT
  if (parameters.decisionLength === getState().cycle.time && 1 < getState().cycle.number) {
    const previousCycleEvent = getState().previousCycles[getState().previousCycles.length - 1];
    if (null !== previousCycleEvent.gameEvent && null !== previousCycleEvent.gameEvent.decision) {
      dispatch(startDecision(previousCycleEvent.gameEvent.decision));
    }
  }

  // ANNOUCEMENT OF THE SACRIFICE PHASE
  if (parameters.cycleLength - parameters.selectionLength === getState().cycle.time) {
    dispatch(selectionAnnouncement());
  }

  // END CYCLE
  if (parameters.cycleLength === getState().cycle.time) {
    dispatch(endCycle());
  }
};

const makeVillagerSpeak = () => (dispatch: any, getState: () => GameState) => {
  const getMessageLevel = (level: number) => {
    if (level < 25) {
      return 'chaotic';
    } else if (level < 50) {
      return 'bad';
    } else if (level < 75) {
      return 'good';
    } else {
      return 'loyal';
    }
  };

  const getInfluencerLevel = (villager: Villager) => {
    const faithLevel = Math.abs(villager.faith - 50);
    const trustLevel = Math.abs(villager.trust - 50);

    return Math.max(faithLevel, trustLevel) / 50; // Value from 0 to 1
  };

  const aliveVillagers = getAliveVillagers(getState().villagers);

  if (aliveVillagers.length === 0) {
    return;
  }

  const maxInfluence = aliveVillagers.reduce(
    (max: number, villager: Villager) => (getInfluencerLevel(villager) > max ? getInfluencerLevel(villager) : max),
    0
  );

  const villager = getRandomArray(aliveVillagers);

  const faithLevel = Math.abs(villager.faith - 50);
  const trustLevel = Math.abs(villager.trust - 50);

  const type = faithLevel > trustLevel ? 'faith' : 'trust';

  const influencerLevel = getInfluencerLevel(villager) / maxInfluence; // Value from 0 to 1

  if (influencerLevel > 1 - parameters.expressiveness) {
    const message = MessagesGenerators.pick(type, getMessageLevel(villager[type]));

    dispatch(villagerSpeaks(message, villager));
  }
};

const villagerSpeaks = (message: string, villager: Villager) => {
  return {type: 'VILLAGER_SPEAKS', message, id: villager.id};
};
