import data from 'src/data';
import {guid} from 'src/core/utils';

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
  faith: Math.floor(Math.random() * 100),
  trust: Math.floor(Math.random() * 100),
  alive: true,
  selected: false,
});

const firstNames = [...data.names.male, ...data.names.female];
