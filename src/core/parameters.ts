const parameters = {
  // Time in second for one cycle
  cycleLength: 30,

  // Time in second for the selection phase
  selectionLength: 10,

  // Maximal number of cycle in one game
  cycleCount: 20,

  // Number of villager in the vilage
  villagerCount: 7 * 4,

  // from 0 to 1: level of expressiveness (how much the villagers speaks)
  expressiveness: 0.3,

  // range of random top and bottom trust. So at the beginning of the game all villager will have a trust of 50 +- 5
  trustLevelStartRange: 10,

  // range of random top and bottom faith. So at the beginning of the game all villager will have a faith of 50 +- 15
  faithLevelStartRange: 80,

  // When a villager speaks, how much time it's displayed (second)
  villagerMessageDuration: 3,

  // Time elapsed after the end of selection phase and before the next cycle
  timeToDisplayAnnouncement: 5,
};

export default parameters;
