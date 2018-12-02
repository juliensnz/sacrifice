import {Villager} from 'src/core/model';

const updateTrust = (villagers: Villager[]) => (villager: Villager) => {
  const sacrificeCount = villagers
    .filter((villager: Villager) => villager.alive)
    .reduce((sacrificed: number, villager: Villager) => sacrificed + (villager.selected ? 1 : 0), 0);

  return {...villager, trust: villager.trust + sacrificeCount};

  return villager;
};

const updateAlive = (villager: Villager) => {
  return {...villager, alive: villager.alive && !villager.selected};
};

export const applyEvents = (villagers: Villager[], events: Event[]) => {
  return villagers.map(updateTrust(villagers)).map(updateAlive);
};

export const getSelectedVillager = (villagers: Villager[]): Villager[] => {
  return villagers.filter((villager: Villager) => villager.selected && villager.alive);
};
