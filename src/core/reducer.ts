type Villager = {
  id: string;
  name: string;
  faith: number;
  trust: number;
  alive: boolean;
  selected: boolean;
};

const generateVillager = (): Villager => ({
  id: guid(),
  name: 'Michel',
  faith: Math.floor(Math.random() * 100),
  trust: Math.floor(Math.random() * 100),
  alive: true,
  selected: false,
});

type GameState = {
  villagers: Villager[];
  currentCycle: number;
};

const initialState = {
  villagers: [generateVillager(), generateVillager(), generateVillager(), generateVillager()],
  currentCycle: 0,
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
      state = {...state, currentCycle: state.currentCycle + 1};

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

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
