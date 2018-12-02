import rawEvents from 'src/data/events';
import {guid} from 'src/core/utils';

type RawEvent = {
  type: string;
  facts: string[];
  consequences: RawEventConsequence[];
};

type RawEventConsequence = {
  consequence: string;
  coef: number;
};

export type GameEvent = {
  id: string;
  type: string;
  text: string;
  coef: number;
};

export const generateEventsFrom = (rawEvents: RawEvent[]): GameEvent[] => {
  return rawEvents.reduce(
    (gameEvents: GameEvent[], rawEvent: RawEvent) => [
      ...gameEvents,
      ...rawEvent.facts.reduce(
        (generatedEvents: GameEvent[], fact: string) => [
          ...generatedEvents,
          ...rawEvent.consequences.map((consequence: RawEventConsequence) => {
            return {
              id: guid(),
              type: rawEvent.type,
              text: `${fact} ${consequence.consequence}`,
              coef: consequence.coef,
            };
          }),
        ],
        []
      ),
    ],
    []
  );
};

export const possibleEvents = generateEventsFrom(rawEvents.events);
