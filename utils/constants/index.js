const appBarItems = ["crewmate", "neutral", "impostor", "add-on"];

const roles = [
  {
    name: "bait",
    desc: "When killed, your killer will automatically self report. This includes Vampire kills when the killer isn’t in the area.",
    tips: [
      "Claim this role.",
      "Be aware of impostor until you claim to being bait.",
      "Roam openly and try to be killed after claiming bait.",
    ],
    team: "crewmate",
    ability: "trap",
    isActive: true,
  },
  {
    name: "lighter",
    desc: "After completing tasks, you get increased vision.",
    tips: [],
    team: "crewmate",
    ability: "buff",
    isActive: true,
  },
  {
    name: "mayor",
    desc: "Your votes count thrice (depending on the settings). They can also call meetings by venting (depending on the settings).",
    tips: [],
    team: "crewmate",
    ability: "authority",
    isActive: true,
  },
  {
    name: "sabotage-master",
    desc: "After completing tasks, you can fix sabotages faster. For instance, reactor or O2 (depending on the settings) can be fixed solo.",
    tips: ["Stay near lights."],
    team: "crewmate",
    ability: "buff",
    isActive: true,
  },
  {
    name: "sheriff",
    desc: "Can kill impostors and whatever neutrals the host has chosen. Settings can dictate whether a misfire kills the crewmate as well.",
    tips: ["Stay at scary place and spam kill button."],
    team: "crewmate",
    ability: "elimination",
    isActive: true,
  },
  {
    name: "snitch",
    desc: "After completing tasks, the impostors (also neutral killers depending on settings) are revealed to you.",
    tips: [
      "Call meeting after completing second last task if needed.",
      "Tell one trustworthy to stay with you.",
      "Lie about being bait if needed.",
    ],
    team: "crewmate",
    ability: "information",
    isActive: true,
  },
  {
    name: "speed-booster",
    desc: "After completing tasks, you become faster.",
    tips: [],
    team: "crewmate",
    ability: "buff",
    isActive: true,
  },
  {
    name: "doctor",
    desc: "Reveals cause of death (kill, misfire, or lover suicide) and can check vitals similarly to the Scientist in vanilla Among Us.",
    tips: ["claim your role."],
    team: "crewmate",
    ability: "information",
    isActive: true,
  },
  {
    name: "beartrap",
    desc: "Prevents the killer from moving away from your body for a set time.",
    tips: ["claim your role."],
    team: "crewmate",
    ability: "trap",
    isActive: true,
  },
  {
    name: "dictator",
    desc: "Voting someone instantly kills them; all other votes are overridden. You die after voting someone, regardless of their alignment.",
    tips: [
      "use it at last or only when you believe that players are not voting right.",
    ],
    team: "crewmate",
    ability: "authority",
    isActive: true,
  },
  {
    name: "seer",
    desc: "Whenever someone dies you will see a “kill flash” meaning your screen will flash right when someone was killed.",
    tips: [],
    team: "crewmate",
    ability: "information",
    isActive: true,
  },
  {
    name: "time-manager",
    desc: "When the time manager completes tasks the meeting time will be increased, however when the time manager dies the time will me reset back to normal.",
    tips: [],
    team: "crewmate",
    ability: "buff",
    isActive: true,
  },

  // NEUTRALS
  {
    name: "arsonist",
    desc: "Douse people until everyone alive is covered in gas (indicated by orange triangles) to ignite and kill everyone via jumping into a vent.",
    tips: [
      "first of all, douse one at table itself.",
      "close doors to infect properly.",
    ],
    team: "neutral",
    ability: "pollute",
    isActive: true,
  },
  {
    name: "jester",
    desc: "Get voted out to win.",
    tips: [
      "Don't claim you as impostor like beginners.",
      "Stay at dead body, wait for someone to come and run from body within a sight of them. If that player reports then suddenly spam that its self.",
    ],
    team: "neutral",
    ability: "manipulation",
    isActive: true,
  },
  {
    name: "opportunist",
    desc: "Just stay alive until the end to win.",
    tips: [
      "Stay in safe places.",
      "Try to make jester, executioner or lovers win.",
    ],
    team: "neutral",
    ability: "survival",
    isActive: true,
  },
  {
    name: "terrorist",
    desc: "after completing tasks, die to win (also get voted out to win, but depends on settings).",
    tips: ["Use vents for finishing tasks fast!"],
    team: "neutral",
    ability: "suicide",
    isActive: true,
  },
  {
    name: "schrodinger's-cat",
    desc: "Get killed by an impostor or jackal to join them. If they win, you win as well.",
    tips: [
      "Stay at the most killing places and try to be killed.",
      "After adapting role, defend them when needed.",
    ],
    team: "neutral",
    ability: "adapt",
    isActive: true,
  },
  {
    name: "egoist",
    desc: "Acts like an impostor, but steals the win from them. Knows who the impostors are and can be killed by them.",
    tips: ["Defend impostors."],
    team: "neutral",
    ability: "manipulation",
    isActive: true,
  },
  {
    name: "executioner",
    desc: "Get your target (normally crew, alignment can be changed in settings) voted out to win. If target dies, executioner will become jester (depends on settings).",
    tips: [
      "Act to be the snitch, do fake tasks and tell everyone to vote out your target. (be aware of them knowing the real snitch)",
    ],
    team: "neutral",
    ability: "manipulation",
    isActive: true,
  },
  {
    name: "jackal",
    desc: "They can also vent however they can't sabotage. The jackal wins when they outnumber the crewmates and when there are no more imposters alive.",
    tips: [
      "Go on killing spree.",
      "Extra tip (if you want to seriously win) - spy from vent, when you see someone killing, kill the killer.",
      "Don't kill snitch.",
    ],
    team: "neutral",
    ability: "elimination",
    isActive: true,
  },
  {
    name: "plague-doctor",
    desc: "The Plague Doctor starts by infecting 2 players by using their kill button and the goal of the plague doctor is to infect every living player starting by infecting 2 players and those 2 said players start infecting other players by spending a TOTAL time of 8 seconds. There are 4 stages to completely infect a player(A completely infected player can also infect, however a non fully infected player cant infect) Each stage is 2 seconds long and when the a player is fully infected they will have a FULL square filled up (color orange) when a player is half infected it will only show a HALF square filled up meaning a fully infected player spent 4 total seconds near a non fully infected player. (NOTE: 2 infections are configurale)",
    tips: [
      "Use all infections as fast as possible.",
      "infect bait.",
      "try to vote out non infected players (knowing their role).",
      "use doors sabotaging.",
    ],
    team: "neutral",
    ability: "pollute",
    isActive: true,
  },

  // IMPOSTORS
  {
    name: "vampire",
    desc: "killing someone will not trigger an immediate death, rather a delayed one by a set time.",
    tips: [],
    team: "impostor",
    ability: "temporal",
    isActive: true,
  },
  {
    name: "insider",
    desc: "Normal impostor but can see dead player's role, other impostor's roles and also knows who is madmate as well.",
    tips: ["Claim the role of a dead player dishonestly."],
    team: "impostor",
    ability: "temporal",
    isActive: true,
  },
  {
    name: "stealth",
    desc: "When stealth kills, all players except impostors will become blind for 3 seconds (depends on settings)",
    tips: [],
    team: "impostor",
    ability: "gothic",
    isActive: true,
  },
  {
    name: "puppeteer",
    desc: "curse a target to do your killing for you. When they pass by someone, they’ll automatically kill. The victim can be another impostor.",
    tips: ["Never puppet a jester or terrorist."],
    team: "impostor",
    ability: "illusion",
    isActive: true,
  },
  {
    name: "witch",
    desc: "cast a spell on a player to appear during a meeting. If the witch is not voted out during the next meeting, all cursed players will die. The Witch can also kill normally.",
    tips: [
      "Curse the bait and beartrap.",
      "Try to curse in dark or in groups.",
    ],
    team: "impostor",
    ability: "curse",
    isActive: true,
  },
  {
    name: "bounty-hunter",
    desc: "you have a target that switches periodically. Killing said targets rewards you with a temporarily shorter cooldown (this carries over to the next round!), while failing to do so increases the next cooldown.",
    tips: [],
    team: "impostor",
    ability: "pursuit",
    isActive: true,
  },
  {
    name: "serial-killer",
    desc: "has a set time to be alive (suicides thereafter) but a shorter cooldown to compensate.",
    tips: [],
    team: "impostor",
    ability: "time limit",
    isActive: true,
  },
  {
    name: "shape-master",
    desc: "essentially a Shapeshifter.",
    tips: [],
    team: "impostor",
    ability: "morph",
    isActive: true,
  },
  {
    name: "warlock",
    desc: "curse a player. When the Warlock shapeshifts, the victim will kill the closest player.",
    tips: [],
    team: "impostor",
    ability: "curse",
    isActive: true,
  },
  {
    name: "mafia",
    desc: "an impostor who can’t kill until the other impostors are dead.",
    tips: [],
    team: "impostor",
    ability: "patience",
    isActive: true,
  },
  {
    name: "fireworks",
    desc: "place a firework by shapeshifting. Kill players next to the fireworks by shifting a second time.",
    tips: [],
    team: "impostor",
    ability: "planning",
    isActive: true,
  },
  {
    name: "sniper",
    desc: "shoot someone from long distance by selecting a point via shapeshifting, walking to another point and unshifting. The bullet will fire in the direction of the first point to the second, killing the first player in its path. Can miss. Kills normally after using all bullets.",
    tips: [],
    team: "impostor",
    ability: "planning",
    isActive: true,
  },
  {
    name: "mare",
    desc: "can only kill when the lights are off, but moves significantly faster during said sabotage.",
    tips: [],
    team: "impostor",
    ability: "gothic",
    isActive: true,
  },
  {
    name: "time-thief",
    desc: "reduces meeting times. Restored upon death.",
    tips: [],
    team: "impostor",
    ability: "buff",
    isActive: true,
  },
  {
    name: "madmate",
    desc: "an impostor who does not know who the other impostors are, and is not known by the other impostors. They cannot kill, vent (depending on settings), or sabotage.",
    tips: [],
    team: "impostor",
    ability: "information",
    isActive: true,
  },
  {
    name: "mad-guardian",
    desc: "an impostor who does not know who the other impostors are, and is not known by the other impostors. After completing tasks, they cannot be killed.",
    tips: [],
    team: "impostor",
    ability: "information",
    isActive: true,
  },
  {
    name: "mad-snitch",
    desc: "an impostor who does not know who the other impostors are, and is not known by the other impostors. After completing tasks, they will know who the other impostors are.",
    tips: [],
    team: "impostor",
    ability: "information",
    isActive: true,
  },

  // Add-on
  {
    name: "lovers",
    desc: "Lovers win ALONE together if they survive until the end, however if one lover gets killed or voted out, the other lover will also die, even if their partner is an imposter. Note: If 1 imposter is lovers with another person and that person survives until the end, the imposter and lover win ALONE without the other imposters.",
    tips: [],
    team: "add-on",
    ability: "survival",
    isActive: true,
  },
  {
    name: "last-impostor",
    desc: "When there is only 1 imposter left, they will have lower kill cooldowns.",
    tips: [],
    team: "add-on",
    ability: "buff",
    isActive: true,
  },
  {
    name: "watcher",
    desc: "With anonymous voting on, you are able to see coloured votes.",
    tips: [
      "Watch out for players who vote themselves (they can be jesters or terrorist).",
      "Identify a mayor (but don't disclose if not needed).",
    ],
    team: "add-on",
    ability: "information",
    isActive: true,
  },
  {
    name: "workhorse",
    desc: "Given to the first crewmate who completes all their tasks, They will be given additional tasks to complete, once completed they win the game for crewmates.",
    tips: [],
    team: "add-on",
    ability: "tasks",
    isActive: true,
  },
];

export { appBarItems, roles };
