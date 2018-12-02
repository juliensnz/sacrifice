import {Villager} from 'src/core/model';
import {GameEvent} from "../reducer";

const FAITH_SACRIFICE_IMPACT = 1;
const FAITH_NO_SACRIFICE_IMPACT = -3;
const HIGH_TRUST_IMPACT = 4;
const LOW_TRUST_IMPACT = 1;

const updateTrust = (villagers: Villager[], event: GameEvent) => (villager: Villager) => {
  const sacrificeCount = villagers
    .filter((villager: Villager) => villager.alive)
    .reduce((sacrificed: number, villager: Villager) => sacrificed + (villager.selected ? 1 : 0), 0);

  console.log('COUNT SACRI', sacrificeCount);
  const hasSacrified = sacrificeCount > 0;
  let impact = 0;

  if (hasSacrified) {
    if (event.coef > 0) {
      impact = HIGH_TRUST_IMPACT;
    } else {
      impact = LOW_TRUST_IMPACT;
    }
  } else {
    if (event.coef < 0) {
      impact = HIGH_TRUST_IMPACT;
    } else {
      impact = LOW_TRUST_IMPACT;
    }
  }

  const deltaTrust = event.coef * impact * ((villager.faith / 100) + 1);
  const totalTrust = Math.min(100, Math.max(villager.trust + deltaTrust, 0));

  return {...villager, trust: totalTrust};
};

const updateFaith = (villagers: Villager[], event: GameEvent) => (villager: Villager) => {
  const sacrificeCount = villagers
    .filter((villager: Villager) => villager.alive)
    .reduce((sacrificed: number, villager: Villager) => sacrificed + (villager.selected ? 1 : 0), 0);

  const hasSacrified = sacrificeCount > 0;

  const impact = hasSacrified
    ? FAITH_SACRIFICE_IMPACT
    : FAITH_NO_SACRIFICE_IMPACT;
  const deltaFaith = event.coef * impact;
  const totalFaith = Math.min(100, Math.max(villager.faith + deltaFaith, 0));

  return {...villager, faith: totalFaith};
};

const updateAlive = (villager: Villager) => {
  return {...villager, alive: villager.alive && !villager.selected, selected: false};
};

export const applyGameEvents = (villagers: Villager[], gameEvents: GameEvent[]) => {
  return villagers
    .map(updateFaith(villagers, gameEvents[0]))
    .map(updateTrust(villagers, gameEvents[0]))
    .map(updateAlive);
};

export const getSelectedVillagers = (villagers: Villager[]): Villager[] => {
  return villagers.filter((villager: Villager) => villager.selected && villager.alive);
};
