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
  rot: number;
  asset: string;
  flip: boolean;
  message: {
    time: number;
    message: string;
  } | null;
};

export const generateVillager = (): Villager => ({
  id: guid(),
  name: firstNames[Math.floor(Math.random() * firstNames.length)],
  faith: 50 - parameters.faithLevelStartRange / 2 + Math.floor(Math.random() * parameters.faithLevelStartRange),
  trust: 50 - parameters.trustLevelStartRange / 2 + Math.floor(Math.random() * parameters.trustLevelStartRange),
  alive: true,
  selected: false,
  rot: Math.floor(Math.random() * 7) * 5 - 15,
  asset: [
    'viking_1',
    'viking_2',
    'Viking fin 10',
    'Viking fin 11',
    'Viking fin 12',
    'Viking fin 13',
    'Viking fin 14',
    'Viking fin 15',
    'Viking fin 16',
    'Viking fin 1',
    'Viking  fin 2',
    'Viking  fin 3',
    'Viking  fin 4',
    'Viking  fin 5',
    'Viking  fin 6',
    'Viking  fin 7',
    'Viking  fin 8',
    'Viking fin 9'
  ][Math.floor(Math.random() * 18)],
  flip: Math.random() > 0.5,
  message: null,
});

const firstNames = [...data.names.male, ...data.names.female];

