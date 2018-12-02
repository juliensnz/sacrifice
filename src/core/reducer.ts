import {Villager, generateVillager} from 'src/core/model';
import parameters from 'src/core/parameters';
import {applyGameEvent} from 'src/core/reducer/villager';
import {GameEvent} from 'src/core/model';

type Cycle = {
  time: number;
  number: number;
  gameEvent: GameEvent | null;
};

export type GameState = {
  villagers: Villager[];
  previousCycles: Cycle[];
  cycle: Cycle;
  selectionStarted: boolean;
  shaman: {
    factAnnouncement: {
      text: string;
      type: string;
    } | null;
    sacrificeAnnouncement: string | null;
  };
  paused: boolean;
};

const initialState = {
  villagers: Array.apply(null, Array(parameters.villagerCount)).map(generateVillager),
  previousCycles: [],
  cycle: {
    number: 0,
    time: 0,
    gameEvent: null,
  },
  selectionStarted: false,
  shaman: {
    factAnnouncement: null,
    sacrificeAnnouncement: null,
  },
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
          gameEvent: null,
        },
        shaman: {...state.shaman, factAnnouncement: null},
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
      state = {
        ...state,
        paused: true,
        shaman: {...state.shaman, factAnnouncement: {text: action.event.text, type: action.event.type}},
      };
      break;

    case 'SELECTION_START':
      state = {...state, paused: false, selectionStarted: true, shaman: {...state.shaman, sacrificeAnnouncement: null}};
      break;

    case 'REGISTER_GAME_EVENT':
      state = {...state, cycle: {...state.cycle, gameEvent: action.gameEvent}};
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
        villagers: applyGameEvent(state.villagers, state.cycle.gameEvent),
        previousCycles: [...state.previousCycles, state.cycle],
      };
      break;

    default:
      break;
  }

  return state;
};
