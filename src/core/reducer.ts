import {Villager, generateVillager} from 'src/core/model';
import parameters from 'src/core/parameters';
import {applyCurrentEvents} from 'src/core/reducer/villager';
import rawEvents from 'src/data/events';

type RawEventConsequence = {
  consequence: string;
  coef: number;
}

type RawEvent = {
  type: string;
  facts: string[];
  consequences: RawEventConsequence[];
};

export type GameEvent = {
  type: string;
  text: string;
  coef: number;
};

export type GameState = {
  villagers: Villager[];
  cycle: {
    time: number;
    number: number;
  };
  selectionStarted: boolean;
  shaman: {
    factAnnouncement: string[];
    sacrificeAnnouncement: string | null;
  };
  currentEvents: GameEvent[];
  possibleEvents: GameEvent[];
  paused: boolean;
};

const generateEventsFrom = (rawEvents: RawEvent[]): GameEvent[] => rawEvents.reduce(
  (gameEvents: GameEvent[], rawEvent: RawEvent) => [
    ...gameEvents,
    ...rawEvent.facts.reduce(
      (generatedEvents: GameEvent[], fact: string) => [
        ...generatedEvents,
        ...rawEvent.consequences.map(
            (consequence: RawEventConsequence) => {
              return {type: rawEvent.type, text: `${fact} ${consequence.consequence}`, coef: consequence.coef}
            }
          )
      ],
      []
    )
  ],
  []
);

const initialState = {
  villagers: Array.apply(null, Array(parameters.villagerCount)).map(generateVillager),
  cycle: {
    number: 0,
    time: 0,
  },
  selectionStarted: false,
  shaman: {
    factAnnouncement: [],
    sacrificeAnnouncement: null,
  },
  currentEvents: [],
  possibleEvents: generateEventsFrom(rawEvents.events),
  paused: false,
};

export default (state: GameState = initialState, action: any) => {
  switch (action.type) {
    case 'START_CYCLE':
      state = {
        ...state,
        cycle: {
          number: state.cycle.number + 1,
          time: 0,
        },
        shaman: {...state.shaman, factAnnouncement: []},
        selectionStarted: false,
      };
      break;

    case 'TOGGLE_SACRIFICED':
      if (!state.selectionStarted) {
        break;
      }

      state = {
        ...state,
        villagers: state.villagers.map((villager: Villager) => {
          if (villager.id === action.id && villager.alive) {
            villager.selected = !villager.selected;
          }

          return villager;
        }),
      };
      break;

    case 'SELECTION_ANNOUNCEMENT':
      state = {...state, paused: true, shaman: {...state.shaman, sacrificeAnnouncement: action.message}};
      break;

    case 'FACT_ANNOUNCEMENT':
      state = {...state, paused: true, shaman: {...state.shaman, factAnnouncement: action.messages}};
      break;

    case 'SELECTION_START':
      state = {...state, paused: false, selectionStarted: true, shaman: {...state.shaman, sacrificeAnnouncement: null}};
      break;

    case 'APPLY_GAME_EVENT':
      state = {...state, currentEvents: [...state.currentEvents, action.gameEvent]};
      break;

    case 'VILLAGER_SPEAKS':
      state = {
        ...state,
        villagers: state.villagers.map((villager: Villager) => {
          if (villager.id === action.id) {
            villager.message = {
              time: parameters.villagerMessageDuration,
              message: action.message,
            };
          }

          return villager;
        }),
      };
      break;

    case 'PAUSE':
      state = {...state, paused: true};
      break;

    case 'RESUME':
      state = {...state, paused: false};
      break;

    case 'TICK':
      state = {
        ...state,
        cycle: {...state.cycle, time: state.cycle.time + 1},
        villagers: state.villagers.map((villager: Villager) => {
          if (null === villager.message) {
            return villager;
          }

          return {
            ...villager,
            message:
              0 === villager.message.time ? null : {message: villager.message.message, time: villager.message.time - 1},
          };
        }),
      };
      break;

    case 'END_CYCLE':
      state = {
        ...state,
        paused: true,
        villagers: applyCurrentEvents(state.villagers, [action.randomGameEvent]),
      };
      break;

    default:
      break;
  }

  return state;
};
