import {Villager, generateVillager} from 'src/core/model';

export type GameState = {
  villagers: Villager[];
  cycle: {
    time: number;
    number: number;
  };
};

const initialState = {
  villagers: Array.apply(null, Array(5 * 5)).map(generateVillager),
  cycle: {
    number: 0,
    time: 0,
  },
};

const updateVillager = (villagers: Villager[], events: Event[]) => {
  const sacrificeCount = villagers.reduce(
    (sacrificed: number, villager: Villager) => sacrificed + (villager.selected ? 1 : 0),
    0
  );

  return villagers.map((villager: Villager) => {
    villager.trust += sacrificeCount;

    return villager;
  });
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
      };

      break;
    case 'TOGGLE_SACRIFICED':
      state = {
        ...state,
        villagers: state.villagers.map((villager: Villager) => {
          if (villager.id === action.id) {
            villager.selected = !villager.selected;
          }

          return villager;
        }),
      };
      break;

    case 'USER_EVENT':
      break;

    case 'TICK':
      state = {...state, cycle: {...state.cycle, time: state.cycle.time + 1}};
      break;

    case 'END_CYCLE':
      break;
      state = {
        ...state,
        villagers: updateVillager(state.villagers, [action.randomEvent]),
      };

    default:
      break;
  }

  return state;
};
