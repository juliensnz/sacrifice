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
    'viking_3',
    'viking_4',
    'viking_5',
    'viking_6',
    'viking_7',
    'viking_8',
    'viking_9',
    'viking_10',
    'viking_11',
    'viking_12',
    'viking_13',
    'viking_14',
    'viking_15',
    'viking_16',
    'viking_17',
    'viking_18',
  ][Math.floor(Math.random() * 18)],
  flip: Math.random() > 0.5,
  message: null,
});

export type RawEvent = {
  type: string;
  facts: string[];
  consequences: RawEventConsequence[];
};

export type RawEventConsequence = {
  consequence: string;
  coef: number;
};

export type GameEvent = {
  id: string;
  type: string;
  text: string;
  coef: number;
};

const firstNames = [...data.names.male, ...data.names.female];
