let player = {
  type: "player",
  actions: { up: false, down: false, left: false, right: false, attack: false },

  currentDirection: "NORD",
  previousDirection: "NORD",

  position: {
    x: 128,
    y: 128,
  },

  size: 20,
  speed: 0.2,
  diagSpeed: 0.2 / 1.41421356237,
  linarMoving: 0,
  diagonalMoving: 0,

  //character have only one of three states in a time: "IDLE", "MOVE", "ATTACK"
  currentState: "IDLE",
  previousState: "IDLE",

  currentAnimation: null,
  lastFrameDrawtime: null,
  currentTimeBetweenFrames: null,
  animationSpeedMultiplier: {
    IDLE: 1,
    MOVE: 1,
    ATTACK: 1,
  },
};

let character_1 = {
  type: "npc",

  currentDirection: "NORD",
  previousDirection: "NORD",

  position: {
    x: 128,
    y: 128,
  },

  size: 20,
  speed: 0.25,
  diagSpeed: 0.25 / 1.41421356237,
  linarMoving: 0,
  diagonalMoving: 0,

  //character have only one of three states in a time: "IDLE", "MOVE", "ATTACK"
  currentState: "IDLE",
  previousState: "IDLE",

  currentAnimation: null,
  lastFrameDrawtime: null,
  currentTimeBetweenFrames: null,
  animationSpeedMultiplier: {
    IDLE: 1,
    MOVE: 1,
    ATTACK: 1,
  },
};

let character_2 = {
  type: "npc",

  currentDirection: "NORD",
  previousDirection: "NORD",

  position: {
    x: 512,
    y: 128,
  },

  size: 20,
  speed: 0.25,
  diagSpeed: 0.25 / 1.41421356237,
  linarMoving: 0,
  diagonalMoving: 0,

  //character have only one of three states in a time: "IDLE", "MOVE", "ATTACK"
  currentState: "IDLE",
  previousState: "IDLE",

  currentAnimation: null,
  lastFrameDrawtime: null,
  currentTimeBetweenFrames: null,
  animationSpeedMultiplier: {
    IDLE: 1,
    MOVE: 1,
    ATTACK: 1,
  },
};
