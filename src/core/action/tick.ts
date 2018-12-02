import parameters from 'src/core/parameters';
import {GameState} from 'src/core/reducer';
import {Villager} from 'src/core/model';
import {getRandomArray} from 'src/core/utils';
import villagers from 'src/data/villagers';
import {endCycle} from 'src/core/action/cycle';
import shaman from 'src/data/shaman';

class MessageGenerator {
  static cloneObject(obj: any) {
    let clone = {};
    for(let i in obj) {
      if(obj[i] != null &&  typeof(obj[i])=="object")
        clone[i] = this.cloneObject(obj[i]);
      else
        clone[i] = obj[i];
    }
    return clone;
  }

  static initialMessages: any;
  static remainingMessages: any;

  static pick(type: string, messageLevel: string) {
    if (!this.initialMessages) {
      this.initialMessages = this.cloneObject(villagers.villagers);
    }
    if (!this.remainingMessages) {
      this.remainingMessages = this.cloneObject(villagers.villagers);
    }
    let messages = Object.values(this.remainingMessages[type][messageLevel]);
    if (messages.length === 0) {
      this.remainingMessages[type][messageLevel] = this.cloneObject(this.initialMessages[type][messageLevel]);
      messages = Object.values(this.remainingMessages[type][messageLevel]);
    }

    const randKey = Object.keys(this.remainingMessages[type][messageLevel])[Math.floor(Math.random() * messages.length)];
    const result = this.remainingMessages[type][messageLevel][randKey];
    delete this.remainingMessages[type][messageLevel][randKey];

    return result;
  }
}

export const tick = () => (dispatch: any) => {
  dispatch({type: 'TICK'});

  dispatch(whatToDo());
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
    const message = MessageGenerator.pick(type, getMessageLevel(villager[type]));

    dispatch(villagerSpeaks(message, villager));
  }
};

const villagerSpeaks = (message: string, villager: Villager) => {
  return {type: 'VILLAGER_SPEAKS', message, id: villager.id};
};

const selectionAnnouncement = () => (dispatch: any, getState: () => GameState) => {
  const getLevel = (level: number) => {
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

  const getFaith = (villagers: Villager[]) => {
    return villagers.reduce((faith: number, villager: Villager) => {
      return faith += villager.faith;
    }, 0) / villagers.length;
  };

  const getTrust = (villagers: Villager[]) => {
    return villagers.reduce((trust: number, villager: Villager) => {
      return trust += villager.trust;
    }, 0) / villagers.length;
  };

  const aliveVillagers = getAliveVillagers(getState().villagers);
  const trustLevel = getLevel(getTrust(aliveVillagers));
  const faithLevel = getLevel(getFaith(aliveVillagers));

  const messages = shaman.shaman;
  let message = messages.find((message) => {
    return message.faith === faithLevel && message.trust === trustLevel;
  });

  if (message === undefined) {
    message = {faith: '', trust:'', text: 'Sacrifice!'};
  }

  dispatch({type: 'SELECTION_ANNOUNCEMENT', message: message.text});
};

const getAliveVillagers = (villagers: Villager[]) => villagers.filter((villager: Villager) => villager.alive);
