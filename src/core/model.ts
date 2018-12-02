import data from 'src/data/names';
import {guid} from 'src/core/utils';
import parameters from 'src/core/parameters';
import {RandomGenerator} from "./RandomGenerator";

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

export const generateVillager = (): Villager => {
  const id = characterImageNumberGenerator.pick();
  const male = id <= 16;
  const name = male ? firstNameMaleGenerator.pick() : firstNameFemaleGenerator.pick();
  return {
    id: guid(),
    name: name,
    faith: 50 - parameters.faithLevelStartRange / 2 + Math.floor(Math.random() * parameters.faithLevelStartRange),
    trust: 50 - parameters.trustLevelStartRange / 2 + Math.floor(Math.random() * parameters.trustLevelStartRange),
    alive: true,
    selected: false,
    rot: Math.floor(Math.random() * 7) * 5 - 15,
    asset: 'viking_' + id,
    flip: Math.random() > 0.5,
    message: null,
  }
};

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

const firstNameMaleGenerator = new RandomGenerator(data.names.male);
const firstNameFemaleGenerator = new RandomGenerator(data.names.female);
const characterImageNumberGenerator = new RandomGenerator([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]);
