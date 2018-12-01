export default {
  events: [
    {
      type: "",
      facts: [
        "",
        "",
      ],
      consequences: [
        {consequence: "", coef: -0},
        {consequence: "", coef: -0},
      ]
    },
    {
      type: "sea storm",
      facts: [
        "A dreadful storm hit our shores.",
        "Extremely violent winds occurred in the sea.",
      ],
      consequences: [
        {consequence: "Our ships are destroyed, we will not be able to raid this summer.", coef: -7},
        {consequence: "Fishermen were surprised when they returned to the port. Their boat crashed on the coast.", coef: -3},
      ]
    },
    {
      type: "cold storm",
      facts: [
        "An unprecedented cold storm hit the region.",
        "As far as ancients can remember, temperatures have never been that low.",
      ],
      consequences: [
        {consequence: "Our crops have become uneatable.", coef: -8},
        {consequence: "Fortunately, our wood stocks are enough.", coef: -0},
        {consequence: "Some villagers have not woken up this morning. Frostbites due to extreme temperatures have been fatal.", coef: -6},
        {consequence: "A farmer has found his animals frozen dead. What are we going to survive with this winter?", coef: -4},
      ]
    },
    {
      type: "lost battle",
      facts: [
        "We lost the battle in the East.",
        "Our warriors have been ambushed.",
      ],
      consequences: [
        {consequence: "All our proud warriors have fallen in battle. Let them rest in Valhalla.", coef: -10},
        {consequence: "We preferred to flee to save our lives.", coef: -3},
      ]
    },
    {
      type: "epidemic villagers",
      facts: [
        "Villagers have contracted an unknown disease, we have never seen these symptoms.",
        "Merchants who were returning from a commercial expedition returned with obvious illness signs",
      ],
      consequences: [
        {consequence: "The epidemic is spreading far too quickly. Almost all the village has already contracted the disease.", coef: -9},
        {consequence: "We do not know how to cure them, their days are counted.", coef: -5},
        {consequence: "They seem to recover, but they keep severe sequelae.", coef: -3},
        {consequence: "Fortunately, our shaman was able to find a cure for them.", coef: -1},
      ]
    },
    {
      type: "epidemic beasts",
      facts: [
        "Following an epidemic, our animals felt ill.",
        "The water of the river may have been poisoned by an animal carcass and our animals drank there. They got sick.",
      ],
      consequences: [
        {consequence: "They have no chance of surviving.", coef: -5},
        {consequence: "Most will recover, but the youngest will surely die.", coef: -2},
      ]
    },
    {
      type: "thunderstorm",
      facts: [
        "Following a violent storm, two houses caught fire.",
        "Lightning hit a barn.",
      ],
      consequences: [
        {consequence: "Fortunately, villagers had time to flee.", coef: -1},
        {consequence: "An entire family died.", coef: -6},
      ]
    },
    {
      type: "rain",
      facts: [
        "The weather was not lenient with us, a violent storm flooded our crops.",
        "Torrential rains fell in a few days.",
      ],
      consequences: [
        {consequence: "Our fields are ravaged, it's terrible.", coef: -4},
        {consequence: "Harvests have taken water and mold, it is a big lack for the community.", coef: -8},
      ]
    },
    {
      type: "animal attack",
      facts: [
        "The packs of wolves that had been roaming around for a few days attacked a villager.",
        "A bear attacked one of us in the forest.",
        "A bear injured a villager.",
      ],
      consequences: [
        {consequence: "We buried what's left of the victim's body.", coef: -5},
        {consequence: "He died instantly.", coef: -4},
        {consequence: "She died instantly.", coef: -4},
        {consequence: "We had to amputate him to save his life. But now he's safe.", coef: -2},
      ]
    },

  ]
}
