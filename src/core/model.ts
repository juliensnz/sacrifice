import data from 'src/data/names';
import {guid} from 'src/core/utils';
import parameters from 'src/core/parameters';

export type Villager = {
  id: string;
  name: string;
  faith: number;
  trust: number;
  alive: boolean;
  selected: boolean;
};

export const generateVillager = (): Villager => ({
  id: guid(),
  name: firstNames[Math.floor(Math.random() * firstNames.length)],
  faith: 50 - parameters.faithLevelStartRange / 2 + Math.floor(Math.random() * parameters.faithLevelStartRange),
  trust: 50 - parameters.trustLevelStartRange / 2 + Math.floor(Math.random() * parameters.trustLevelStartRange),
  alive: true,
  selected: false,
});

const firstNames = [...data.names.male, ...data.names.female];
