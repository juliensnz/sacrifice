import {Villager} from 'src/core/model';
import {GameEvent} from 'src/core/model';
import parameters from 'src/core/parameters';

const updateTrust = (villagers: Villager[], event: GameEvent) => (villager: Villager) => {
  const sacrificeCount = villagers.filter((villager: Villager) => villager.selected).length;

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

  const deltaTrust = event.coef * impact * (villager.faith / 100 + 1);
  const totalTrust = Math.round(Math.min(100, Math.max(villager.trust + deltaTrust, 0)));

  return {...villager, trust: totalTrust};
};

const updateFaith = (villagers: Villager[], event: GameEvent) => (villager: Villager) => {
  const sacrificeCount = villagers.filter((villager: Villager) => villager.selected).length;

  const hasSacrificed = sacrificeCount > 0;

  const impact = hasSacrificed ? parameters.faithSacrificeImpact : parameters.faithNoSacrificeImpact;

  let deltaFaith = event.coef * impact;
  deltaFaith = hasSacrificed ? deltaFaith * sacrificeCount : deltaFaith;

  const totalFaith = Math.round(Math.min(100, Math.max(villager.faith + deltaFaith, 0)));

  return {...villager, faith: totalFaith};
};

const updateAlive = (villager: Villager) => {
  return {...villager, alive: villager.alive && !villager.selected, selected: false};
};

export const applyGameEvent = (villagers: Villager[], currentEvent: GameEvent | null) => {
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

export const applyDecisionEvent = (villagers: Villager[], coef: number) => {
  villagers.map(villager => {
    const deltaTrust = coef * parameters.trustDecisionMultiplicator;
    villager.trust = Math.round(Math.min(100, Math.max(villager.trust + deltaTrust, 0)));
  });

  return villagers;
};
