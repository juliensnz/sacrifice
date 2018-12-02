import {Villager} from 'src/core/model';
import {GameEvent} from "../reducer";

const updateTrust = (villagers: Villager[], events: GameEvent[]) => (villager: Villager) => {
  const sacrificeCount = villagers
    .filter((villager: Villager) => villager.alive)
    .reduce((sacrificed: number, villager: Villager) => sacrificed + (villager.selected ? 1 : 0), 0);

  return {...villager, trust: villager.trust + sacrificeCount};
};

const updateAlive = (villager: Villager) => {
  return {...villager, alive: villager.alive && !villager.selected, selected: false};
};

export const applyCurrentEvents = (villagers: Villager[], events: GameEvent[]) => {
  return villagers.map(updateTrust(villagers, events)).map(updateAlive);
};

export const getSelectedVillagers = (villagers: Villager[]): Villager[] => {
  return villagers.filter((villager: Villager) => villager.selected && villager.alive);
};
