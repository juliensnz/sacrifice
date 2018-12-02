import {RawEvent, RawEventConsequence, GameEvent} from 'src/core/model';
import rawEvents from 'src/data/events';
import {guid} from 'src/core/utils';

const generateEventsFrom = (rawEvents: RawEvent[]): GameEvent[] => {
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
