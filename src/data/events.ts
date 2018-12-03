export default {
  events: [
    {
      type: "ship completed",
      facts: ["The building of the new boat is complete.", "The longship is ready, our carpenters finished their last work."],
      consequences: [
        {
          consequence: "This is the most beautiful ship we have ever designed.",
          coef: 2,
          decision: {
            text: "Do you want to give a name to our new longship?",
            yes: {
              coef: 1,
              text: "We christened it Njordu, in honor of the God of wind and sea.",
            },
            no: {
              coef: 0,
              text: "Fine my Jarl. A name is not necessary to drive us to glory."
            },
          },
        },
        {
          consequence: "Next moon, our warriors will be able to raid.",
          coef: 5,
          decision: {
            text: "We are at low tide, but should we try the new ship right away?",
            yes: {
              coef: -1,
              text: "The ship get blocked near the shore of Farum. We'll have to wait tomorrow, to release it at high tide.",
            },
            no: {
              coef: 1,
              text: "We'll try tomorrow then, at high tide."
            },
          },
        },
        {consequence: "We will be able to venture to unexplored regions.", coef: 4},
      ],
    },
    {
      type: "business is good",
      facts: [
        "We closed a commercial agreement with Lödöse, the neighboring village.",
        "Our merchants come back from the trading post located at Herjolfsnes.",
      ],
      consequences: [
        {
          consequence: "Business is booming, our chests are full of gold and gemstones.",
          coef: 8,
          decision: {
            text: "Should we trade some of our gold against bronze and iron at the market of Kongsgård?",
            yes: {
              coef: -1,
              text: "Our merchants have been attacked. We lost the goods.",
            },
            no: {
              coef: 1,
              text: "Good news, I learnt that a convoy of merchants will pass by the village next month. We'll be able to trade gold in case of need."
            },
          },
        },
        {consequence: "This opens up great financial prospects for our village.", coef: 3},
      ],
    },
    {
      type: "mild weather",
      facts: [
        "Temperatures are incredibly mild right now.",
        "The weather has been exceptionally mild with us for many moons.",
      ],
      consequences: [
        {
          consequence: "The crops will be amazing.",
          coef: 6,
          decision: {
            text: "Should we build a new barn to be able harvest so much wheat and barley?",
            yes: {
              coef: 1,
              text: "The new barn is finished and ready to store our next harvest.",
            },
            no: {
              coef: 1,
              text: "We'll clean the existing barns, that should give us enough storage space."
            },
          },
        },
        {consequence: "Our livestock is doing well.", coef: 3},
        {
          consequence: "Fishermen return with full nets.",
          coef: 7,
          decision: {
            text: "Should we ask the village of Hovgården if we can prepare part of the fishing in their smoking fish house?",
            yes: {
              coef: 1,
              text: "They answered positively. We'll be able to use their smoking fish house for free.",
            },
            no: {
              coef: -1,
              text: "Too bad, we lost half of the catch as we couldn't cook it correctly."
            },
          },
        },
        {consequence: "Children enjoy this weather to play outdoors.", coef: 0},
      ],
    },
    {
      type: "enemy village looted",
      facts: ["Our fighters came back victorious from the raid.", "The hunting horns of our warriors sound far away."],
      consequences: [
        {
          consequence: "They come back the arms full of gold, furs and food.",
          coef: 10,
          decision: {
            text: "Should we celebrate this victory Commander?",
            yes: {
              coef: 1,
              text: "The village is happy with the victory and the feast.",
            },
            no: {
              coef: -1,
              text: "Some robbers took advantage of the feast to steal a part of the loot."
            },
          },
        },
        {consequence: "Their victory showers us with glory.", coef: 2},
        {
          consequence: "The slaves they captured will be of great benefit.", coef: 9,
          decision: {
            text: "Do you want to reward the warrior by giving them a personal slave?",
            yes: {
              coef: 1,
              text: "They praise you my Jarl!",
            },
            no: {
              coef: -1,
              text: "Warriors are quite disappointed. They were hopping to get rewarded."
            },
          },
        },
      ],
    },
    {
      type: "wild animals left",
      facts: ["Our hunters are formal.", "Our scouts just returned from the forest."],
      consequences: [
        {consequence: "The wolves have left the area, we will finally be able to breathe a bit.", coef: 1},
        {
          consequence: "The bear family has been found dead. We have recovered the fur.",
          coef: 4,
          decision: {
            text: "Should we investigate the cause of the bear family death?",
            yes: {
              coef: -1,
              text: "Our hunters have been wounded by a wolf pack.",
            },
            no: {
              coef: 1,
              text: "All right my Jarl. Let's keep safe."
            },
          },
        },
      ],
    },
    {
      type: "harvest",
      facts: ["Farmers came back from the fields.", "Harvests are now over."],
      consequences: [
        {consequence: "The harvest is exceptional. Our barns have never been that full.", coef: 8},
        {consequence: "Because of last season's bad weather, we have just enough to keep up.", coef: 1},
      ],
    },
    {
      type: "sea storm",
      facts: ["A dreadful storm hit our shores.", "Extremely violent winds occurred in the sea."],
      consequences: [
        {consequence: "Our ships are destroyed, we will not be able to raid this summer.", coef: -7},
        {
          consequence: "Fishermen were surprised when they returned to the port. Their boat crashed on the coast.",
          coef: -3,
        },
      ],
    },
    {
      type: "cold storm",
      facts: [
        "An unprecedented cold storm hit the region.",
        "As far as ancients can remember, temperatures have never been that low.",
      ],
      consequences: [
        {
          consequence: "Our crops have become uneatable.",
          coef: -8,
          decision: {
            text: "Do you want to send merchants to Märsta to buy wheat, fish and meat?",
            yes: {
              coef: 1,
              text: "Merchants came back. They negotiated a good price. We'll be able to hold out until spring.",
            },
            no: {
              coef: -1,
              text: "The farmers checked their barns and are formal. We don't enough to hold out until winter."
            },
          },
        },
        {consequence: "Fortunately, our wood stocks are enough.", coef: -0},
        {
          consequence:
            "Some villagers have not woken up this morning. Frostbites due to extreme temperatures have been fatal.",
          coef: -6,
        },
        {
          consequence: "A farmer has found his animals frozen dead. What are we going to survive with this winter?",
          coef: -4,
        },
      ],
    },
    {
      type: "lost battle",
      facts: ["We lost the battle at Skálholt.", "Our warriors have been ambushed at Tissø."],
      consequences: [
        {
          consequence: "All our proud warriors have fallen in battle. Let them rest in Valhalla.",
          coef: -10,
          decision: {
            text: "We are low in food, but do you want to organize a feast to honor the memory of the lost warriors?",
            yes: {
              coef: -1,
              text: "This feast was an error. We won't have enough to hold on until winter.",
            },
            no: {
              coef: 1,
              text: "It's a wise decision. We have to think about the alive villagers first. We'll bury them with the honors they deserve."
            },
          },
        },
        {
          consequence: "We preferred to flee to save our lives.",
          coef: -3,
          decision: {
            text: "Commander, should we punish the fearful soldiers that fled?",
            yes: {
              coef: -1,
              text: "Survivors escaped before we could put them in jail.",
            },
            no: {
              coef: -1,
              text: "There is a revolt inside our troops. Cowards are not tolerated among us."
            },
          },
        },
      ],
    },
    {
      type: "epidemic villagers",
      facts: [
        "Villagers have contracted an unknown disease, we have never seen these symptoms.",
        "Merchants came back from a commercial expedition with obvious illness signs.",
      ],
      consequences: [
        {
          consequence:
            "The epidemic is spreading far too quickly. Almost a quarter of the villages has already contracted the disease.",
          coef: -9,
          decision: {
            text: "I'm afraid it's already too late for the sick persons, but should we pick the doctor of Garðaríki up?",
            yes: {
              coef: 1,
              text: "The doctor was able to save a few persons and quarantine the others. The contamination stopped.",
            },
            no: {
              coef: -1,
              text: "The contamination keeps on spreading quickly. Half the village is dead. It's a disaster!"
            },
          },
        },
        {
          consequence: "We do not know how to cure them, their days are counted.",
          coef: -5,
          decision: {
            text: "Should we end the suffering of the sick villagers?",
            yes: {
              coef: 1,
              text: "This stops the contamination. It was a blessing in disguise.",
            },
            no: {
              coef: -1,
              text: "They contaminated other villagers!"
            },
          },
        },
        {consequence: "They seem to recover, but they keep severe sequelae.", coef: -3},
        {consequence: "Fortunately, the doctor was able to find a cure for them.", coef: -1},
      ],
    },
    {
      type: "epidemic beasts",
      facts: [
        "Following an epidemic, our animals felt ill.",
        "The water of the river may have been poisoned by an animal carcass and our animals drank there. They got sick.",
      ],
      consequences: [
        {
          consequence: "They have no chance of surviving.",
          coef: -5,
          decision: {
            text: "Should we ask the shaman if he can do something about the sick animals?",
            yes: {
              coef: -1,
              text: "The shaman decided to sacrifice all the herd in the name of Loki.",
            },
            no: {
              coef: 1,
              text: "We quarantine the ill animals. The rest of the herd is safe."
            },
          },
        },
        {consequence: "Most will recover, but the youngest ones will surely die.", coef: -2},
      ],
    },
    {
      type: "thunderstorm",
      facts: ["Following a violent storm, two houses caught fire.", "Lightning hit a barn."],
      consequences: [
        {
          consequence: "Fortunately, villagers had time to flee.",
          coef: -1,
          decision: {
            text:
              "Do you want to rebuild what the thunderstorm destroyed? This could delay the construction of the ships.",
            yes: {
              coef: 1,
              text:
                "Our best carpenters have been mobilised to rebuild. It has been done quickly and without delaying the construction of the ships.",
            },
            no: {coef: -1, text: "The villagers didn't understand your decision. Those buildings were important."},
          },
        },
        {consequence: "An entire family died.", coef: -6},
      ],
    },
    {
      type: "rain",
      facts: [
        "The weather was not lenient with us, a violent storm flooded our crops.",
        "Torrential rains fell last few days.",
      ],
      consequences: [
        {consequence: "Our fields are ravaged, it's terrible.", coef: -4},
        {
          consequence: "Harvests got mold, it is a big lack for the community.",
          coef: -8,
          decision: {
            text: "Do you want to send merchants to Märsta to buy wheat, fish and meat?",
            yes: {
              coef: 1,
              text: "Merchants came back. They negotiated a good price. We'll be able to hold out until spring.",
            },
            no: {
              coef: -1,
              text: "The farmers checked their barns and are formal. We don't enough to hold out until winter."
            },
          },
        },
      ],
    },
    {
      type: "animal attack",
      facts: [
        "The packs of wolves that had been roaming around for a few days attacked a villager.",
        "A bear attacked one of us in the forest.",
        "A bear injured a villager.",
      ],
      consequences: [
        {
          consequence: "We buried what's left of the victim's body.",
          coef: -5,
          decision: {
            text: "Do you want to hunt down the wild animals which are roaming around the village?",
            yes: {
              coef: 1,
              text: "Hunters came back. They killed two wolves and one bear. We're safe now.",
            },
            no: {
              coef: -1,
              text: "A wolf came closer to the village and afraid the kids that were playing."
            },
          },
        },
        {consequence: "He died instantly.", coef: -4},
        {
          consequence: "She died instantly.",
          coef: -4,
          decision: {
            text: "Do you want to hunt down the wild animals which are roaming around the village?",
            yes: {
              coef: 1,
              text: "Hunters came back. They killed two wolves and one bear. We're safe now.",
            },
            no: {
              coef: -1,
              text: "A wolf came closer to the village and afraid the kids that were playing."
            },
          },
        },
        {
          consequence: "We had to amputate him to save his life. But now he's safe.",
          coef: -2,
          decision: {
            text: "Do you want to hunt down the wild animals which are roaming around the village?",
            yes: {
              coef: -1,
              text: "Hunters came back. Two of them are wounded.",
            },
            no: {
              coef: -1,
              text: "A wolf came closer to the village and afraid the kids that were playing."
            },
          },
        },
      ],
    },
  ],
};
