import {Villager, generateVillager, Cycle, Decision} from 'src/core/model';
import parameters from 'src/core/parameters';
import {applyGameEvent, applyDecisionEvent} from 'src/core/reducer/villager';

export type GameState = {
  villagers: Villager[];
  previousCycles: Cycle[];
  cycle: Cycle;
  decision: Decision | null;
  decisionAnswer: string | null;
  selectionStarted: boolean;
  shaman: {
    factAnnouncement: {
      text: string;
      type: string;
    } | null;
    sacrificeAnnouncement: string | null;
  };
  paused: boolean;
  gameover: string | null;
};

const initialState = {
  villagers: Array.apply(null, Array(parameters.villagerCount)).map(generateVillager),
  previousCycles: [],
  cycle: {
    number: 0,
    time: 0,
    gameEvent: null,
  },
  decision: null,
  decisionAnswer: null,
  selectionStarted: false,
  shaman: {
    factAnnouncement: null,
    sacrificeAnnouncement: null,
  },
  paused: false,
  gameover: null,
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
        selectionStarted: false,
      };
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

    case 'DECISION_START':
      state = {...state, paused: true, decision: action.decision};
      break;

    case 'DECISION_CONFIRMATION':
      if (null === state.decision) {
        break;
      }

      const decisionAnswer = state.decision[action.type];
      state = {
        ...state,
        decision: null,
        decisionAnswer: decisionAnswer.text,
        villagers: applyDecisionEvent(state.villagers, decisionAnswer.coef),
      };
      break;

    case 'DISMISS_DECISION':
      state = {
        ...state,
        paused: false,
        decisionAnswer: null,
      };
      break;

    case 'SELECTION_ANNOUNCEMENT':
      state = {...state, paused: true, shaman: {...state.shaman, sacrificeAnnouncement: action.message}};
      break;

    case 'SELECTION_START':
      state = {...state, paused: false, selectionStarted: true, shaman: {...state.shaman, sacrificeAnnouncement: null}};
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

    case 'REGISTER_GAME_EVENT':
      state = {...state, cycle: {...state.cycle, gameEvent: action.gameEvent}};
      break;

    case 'END_CYCLE':
      state = {
        ...state,
        paused: true,
        villagers: applyGameEvent(state.villagers, state.cycle.gameEvent),
        previousCycles: [...state.previousCycles, state.cycle],
      };
      break;

    case 'FACT_ANNOUNCEMENT':
      state = {
        ...state,
        paused: true,
        shaman: {...state.shaman, factAnnouncement: {text: action.event.text, type: action.event.type}},
      };
      break;

    case 'DISMISS_FACT':
      state = {
        ...state,
        shaman: {...state.shaman, factAnnouncement: null},
      };
      break;

    case 'END_GAME':
      const reason = action.reason;
      state = {
        ...state,
        gameover: reason,
        paused: true,
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

    default:
      break;
  }

  return state;
};
