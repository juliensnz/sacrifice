import {Villager, generateVillager} from 'src/core/model';
import parameters from 'src/core/parameters';
import {applyEvents} from 'src/core/reducer/villager';

export type Event = {
  type: string;
  fact: string;
  consequence: string;
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
  events: Event[];
  paused: boolean;
};

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
  events: [],
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
      state = {...state, paused: true, shaman: {...state.shaman, factAnnouncement: action.message}};
      break;

    case 'SELECTION_START':
      state = {...state, paused: false, selectionStarted: true, shaman: {...state.shaman, sacrificeAnnouncement: null}};
      break;

    case 'USER_EVENT':
      state = {...state, events: [...state.events, action.event]};
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
        villagers: applyEvents(state.villagers, [action.randomEvent]),
      };
      break;

    default:
      break;
  }

  return state;
};
