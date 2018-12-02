import {Villager} from './model';

export const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

export const getRandomArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getAliveVillagers = (villagers: Villager[]) => villagers.filter((villager: Villager) => villager.alive);

export const getFaith = (villagers: Villager[]) => {
  return (
    villagers.reduce((faith: number, villager: Villager) => {
      return faith + villager.faith;
    }, 0) / villagers.length
  );
};

export const getTrust = (villagers: Villager[]) => {
  return (
    villagers.reduce((trust: number, villager: Villager) => {
      return trust + villager.trust;
    }, 0) / villagers.length
  );
};
