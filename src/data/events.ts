export default {
  events: [
    {
      type: 'ship completed',
      facts: ['The building of the new boat is complete.', 'Our carpenters finished their last work.'],
      consequences: [
        {consequence: 'This is the most beautiful ship we have ever designed.', coef: 4},
        {consequence: 'Next moon, our warriors will be able to raid.', coef: 5},
        {consequence: 'We will be able to venture to unexplored regions.', coef: 2},
      ],
    },
    {
      type: 'business is good',
      facts: [
        'We closed a commercial agreement with the neighboring village.',
        'Our merchants come back from the trading post.',
      ],
      consequences: [
        {consequence: 'Business is booming, our chests are full of gold.', coef: 8},
        {consequence: 'This opens up great financial prospects for our village.', coef: 3},
      ],
    },
    {
      type: 'mild weather',
      facts: [
        'Temperatures are incredibly mild right now.',
        'The weather has been exceptionally mild with us for many moons.',
      ],
      consequences: [
        {consequence: 'The crops will be amazing.', coef: 6},
        {consequence: 'Our livestock is doing well.', coef: 3},
        {consequence: 'Fishermen return with full nets.', coef: 7},
        {consequence: 'Children enjoy this weather to play outdoors.', coef: 0},
      ],
    },
    {
      type: 'enemy village looted',
      facts: ['Our fighters came back victorious from the raid.', 'The hunting horns of our warriors sound far away.'],
      consequences: [
        {consequence: 'They come back the arms full of gold, furs and food.', coef: 10},
        {consequence: 'Their victory showers us with glory.', coef: 2},
        {consequence: 'The slaves they captured will be of great benefit.', coef: 9},
      ],
    },
    {
      type: 'wild animals left',
      facts: ['Our hunters are formal.', 'Our scouts just returned from the forest.'],
      consequences: [
        {consequence: 'The wolves have left the area, we will finally be able to breathe a bit.', coef: 1},
        {consequence: 'The bear family has been found dead. We have recovered the fur.', coef: 4},
      ],
    },
    {
      type: 'harvest',
      facts: ['Farmers came back from the fields.', 'Harvests are now over.'],
      consequences: [
        {consequence: 'The harvest is exceptional. Our barns have never been that full.', coef: 8},
        {consequence: "Because of last season's bad weather, we have just enough to keep up.", coef: 1},
      ],
    },
    {
      type: 'sea storm',
      facts: ['A dreadful storm hit our shores.', 'Extremely violent winds occurred in the sea.'],
      consequences: [
        {consequence: 'Our ships are destroyed, we will not be able to raid this summer.', coef: -7},
        {
          consequence: 'Fishermen were surprised when they returned to the port. Their boat crashed on the coast.',
          coef: -3,
        },
      ],
    },
    {
      type: 'cold storm',
      facts: [
        'An unprecedented cold storm hit the region.',
        'As far as ancients can remember, temperatures have never been that low.',
      ],
      consequences: [
        {consequence: 'Our crops have become uneatable.', coef: -8},
        {consequence: 'Fortunately, our wood stocks are enough.', coef: -0},
        {
          consequence:
            'Some villagers have not woken up this morning. Frostbites due to extreme temperatures have been fatal.',
          coef: -6,
        },
        {
          consequence: 'A farmer has found his animals frozen dead. What are we going to survive with this winter?',
          coef: -4,
        },
      ],
    },
    {
      type: 'lost battle',
      facts: ['We lost the battle in the East.', 'Our warriors have been ambushed.'],
      consequences: [
        {consequence: 'All our proud warriors have fallen in battle. Let them rest in Valhalla.', coef: -10},
        {consequence: 'We preferred to flee to save our lives.', coef: -3},
      ],
    },
    {
      type: 'epidemic villagers',
      facts: [
        'Villagers have contracted an unknown disease, we have never seen these symptoms.',
        'Merchants came back from a commercial expedition with obvious illness signs.',
      ],
      consequences: [
        {
          consequence:
            'The epidemic is spreading far too quickly. Almost all the village has already contracted the disease.',
          coef: -9,
        },
        {consequence: 'We do not know how to cure them, their days are counted.', coef: -5},
        {consequence: 'They seem to recover, but they keep severe sequelae.', coef: -3},
        {consequence: 'Fortunately, our shaman was able to find a cure for them.', coef: -1},
      ],
    },
    {
      type: 'epidemic beasts',
      facts: [
        'Following an epidemic, our animals felt ill.',
        'The water of the river may have been poisoned by an animal carcass and our animals drank there. They got sick.',
      ],
      consequences: [
        {consequence: 'They have no chance of surviving.', coef: -5},
        {consequence: 'Most will recover, but the youngest ones will surely die.', coef: -2},
      ],
    },
    {
      type: 'thunderstorm',
      facts: ['Following a violent storm, two houses caught fire.', 'Lightning hit a barn.'],
      consequences: [
        {
          consequence: 'Fortunately, villagers had time to flee.',
          coef: -1,
          decision: {
            text:
              'Do you want to rebuild what the thunderstorm destroyed? This could delay the construction of the ships.',
            yes: {
              coef: 1,
              text:
                'Our best carpenters have been mobilised to rebuild. It has been done quickly and without delaying the construction of the ships.',
            },
            no: {coef: -1, text: "The villagers didn't understand your decision. Those buildings were important."},
          },
        },
        {consequence: 'An entire family died.', coef: -6},
      ],
    },
    {
      type: 'rain',
      facts: [
        'The weather was not lenient with us, a violent storm flooded our crops.',
        'Torrential rains fell last few days.',
      ],
      consequences: [
        {consequence: "Our fields are ravaged, it's terrible.", coef: -4},
        {consequence: 'Harvests got mold, it is a big lack for the community.', coef: -8},
      ],
    },
    {
      type: 'animal attack',
      facts: [
        'The packs of wolves that had been roaming around for a few days attacked a villager.',
        'A bear attacked one of us in the forest.',
        'A bear injured a villager.',
      ],
      consequences: [
        {consequence: "We buried what's left of the victim's body.", coef: -5},
        {consequence: 'He died instantly.', coef: -4},
        {consequence: 'She died instantly.', coef: -4},
        {consequence: "We had to amputate him to save his life. But now he's safe.", coef: -2},
      ],
    },
  ],
};
