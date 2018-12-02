import {GameState} from 'src/core/reducer';
import {Villager} from 'src/core/model';
import {getAliveVillagers, getTrust, getFaith} from 'src/core/utils';
import shaman from 'src/data/shaman';

export const selectionAnnouncement = () => (dispatch: any, getState: () => GameState) => {
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

  const aliveVillagers = getAliveVillagers(getState().villagers);
  const trustLevel = getLevel(getTrust(aliveVillagers));
  const faithLevel = getLevel(getFaith(aliveVillagers));

  const messages = shaman.shaman;
  let message = messages.find(message => {
    return message.faith === faithLevel && message.trust === trustLevel;
  });

  if (message === undefined) {
    message = {faith: '', trust: '', text: 'Sacrifice!'};
  }

  dispatch({type: 'SELECTION_ANNOUNCEMENT', message: message.text});
};
