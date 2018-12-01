import data from 'src/names';
import {guid} from 'src/core/utils';

export type Villager = {
  id: string;
  name: string;
  faith: number;
  trust: number;
  alive: boolean;
  selected: boolean;
  rot: number;
  asset: string;
  flip: boolean;
};

export const generateVillager = (): Villager => ({
  id: guid(),
  name: firstNames[Math.floor(Math.random() * firstNames.length)],
  faith: Math.floor(Math.random() * 100),
  trust: Math.floor(Math.random() * 100),
  alive: true,
  selected: false,
  rot: Math.floor(Math.random() * 7) * 5 - 15,
  asset: ['shaman', 'viking_1', 'viking_2'][Math.floor(Math.random() * 3)],
  flip: Math.random() > 0.5,
});

const firstNames = [...data.names.male, ...data.names.female];
