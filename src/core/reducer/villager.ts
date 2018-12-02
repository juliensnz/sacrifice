import {Villager} from 'src/core/model';
import {GameEvent} from "../reducer";
import parameters from 'src/core/parameters';

const updateTrust = (villagers: Villager[], event: GameEvent) => (villager: Villager) => {
  const sacrificeCount = villagers
    .filter((villager: Villager) => villager.selected)
    .length;

  const hasSacrificed = sacrificeCount > 0;
  let impact = 0;

  if (hasSacrificed) {
    if (event.coef > 0) {
      impact = parameters.highTrustImpact;
    } else {
      impact = parameters.lowTrustImpact;
    }
  } else {
    if (event.coef < 0) {
      impact = parameters.highTrustImpact;
    } else {
      impact = parameters.lowTrustImpact;
    }
  }

  const deltaTrust = event.coef * impact * ((villager.faith / 100) + 1);
  const totalTrust = Math.round(Math.min(100, Math.max(villager.trust + deltaTrust, 0)));

  return {...villager, trust: totalTrust};
};

const updateFaith = (villagers: Villager[], event: GameEvent) => (villager: Villager) => {
  const sacrificeCount = villagers
    .filter((villager: Villager) => villager.selected)
    .length;

  const hasSacrificed = sacrificeCount > 0;

  const impact = hasSacrificed
    ? parameters.faithSacrificeImpact
    : parameters.faithNoSacrificeImpact;
  const deltaFaith = event.coef * impact;
  const totalFaith = Math.round(Math.min(100, Math.max(villager.faith + deltaFaith, 0)));

  return {...villager, faith: totalFaith};
};

const updateAlive = (villager: Villager) => {
  return {...villager, alive: villager.alive && !villager.selected, selected: false};
};

export const applyCurrentEvent = (villagers: Villager[], currentEvent: GameEvent | null) => {
  if (null === currentEvent) {
    return villagers;
  }

  return villagers
    .map(updateFaith(villagers, currentEvent))
    .map(updateTrust(villagers, currentEvent))
    .map(updateAlive);
};

export const getSelectedVillagers = (villagers: Villager[]): Villager[] => {
  return villagers.filter((villager: Villager) => villager.selected && villager.alive);
};
