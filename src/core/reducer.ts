import {Villager, generateVillager, Cycle, Decision} from 'src/core/model';
import parameters from 'src/core/parameters';
import {applyGameEvent, applyDecisionEvent} from 'src/core/reducer/villager';
import {getRandomArray} from 'src/core/utils';

export type GameState = {
  villagers: Villager[];
  previousCycles: Cycle[];
  isIntro: boolean;
  isLanding: boolean;
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
  anonymousLetterDisplayed: boolean;
  gameplayDisplayed: boolean;
};

const initialVillagers = Array.apply(null, Array(parameters.villagerCount)).map(generateVillager) as Villager[];

const initialState = {
  villagers: initialVillagers,
  previousCycles: [],
  isIntro: false,
  isLanding: true,
  cycle: {
    number: 0,
    time: 0,
    gameEvent: null,
    messager: getRandomArray(initialVillagers),
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
  anonymousLetterDisplayed: false,
  gameplayDisplayed: false,
};

export default (state: GameState = initialState, action: any) => {
  switch (action.type) {
    case 'START_INTRO':
      state = {
        ...state,
        isLanding: false,
        isIntro: true,
      };
      break;

    case 'START_GAME':
      state = {
        ...state,
        isIntro: false,
      };
      break;

    case 'START_CYCLE':
      state = {
        ...state,
        cycle: {
          number: state.cycle.number + 1,
          time: 0,
          gameEvent: null,
          messager: getRandomArray(state.villagers),
        },
        selectionStarted: false,
      };
      break;

    case 'VILLAGER_STARTS_TO_SPEAK':
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

    case 'VILLAGERS_STOP_TO_SPEAK':
      state = {
        ...state,
        villagers: state.villagers.map((villager: Villager) => {
          return {...villager, message: null};
        }),
      };
      break;

    case 'ANONYMOUS_LETTER_DISPLAY_START':
      state = {...state, paused: true, anonymousLetterDisplayed: true};
      break;

    case 'ANONYMOUS_LETTER_DISMISS':
      state = {...state, paused: false, anonymousLetterDisplayed: false};
      break;

    case 'GAMEPLAY_TUTORIAL_START':
      state = {...state, paused: true, gameplayDisplayed: true};
      break;

    case 'GAMEPLAY_TUTORIAL_DISMISS':
      state = {...state, paused: false, gameplayDisplayed: false};
      break;

    case 'DECISION_DISPLAY_START':
      state = {...state, paused: true, decision: action.decision};
      break;

    case 'DECISION_CONFIRMATION':
      if (null === state.decision) {
        break;
      }

      const decisionAnswer = state.decision[action.choice];
      state = {
        ...state,
        decision: null,
        decisionAnswer: decisionAnswer.text,
        villagers: applyDecisionEvent(state.villagers, decisionAnswer.coef),
      };
      break;

    case 'DECISION_CONSEQUENCE_DISMISS':
      state = {
        ...state,
        paused: false,
        decisionAnswer: null,
      };
      break;

    case 'SELECTION_PHASE_ANNOUNCEMENT':
      state = {...state, paused: true, shaman: {...state.shaman, sacrificeAnnouncement: action.message}};
      break;

    case 'SELECTION_PHASE_START':
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
        selectionStarted: false,
      };
      break;

    case 'CYCLE_FACT_ANNOUNCEMENT_START':
      state = {
        ...state,
        paused: true,
        shaman: {...state.shaman, factAnnouncement: {text: action.event.text, type: action.event.type}},
      };
      break;

    case 'CYCLE_FACT_ANNOUNCEMENT_DISMISS':
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
