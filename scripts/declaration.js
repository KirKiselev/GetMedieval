let images = {
  IDLE_NORD: new Image(),
  IDLE_SOUTH: new Image(),
  IDLE_WEST: new Image(),
  IDLE_EAST: new Image(),
  IDLE_NORDWEST: new Image(),
  IDLE_NORDEAST: new Image(),
  IDLE_SOUTHWEST: new Image(),
  IDLE_SOUTHEAST: new Image(),
  MOVE_NORD: new Image(),
  MOVE_SOUTH: new Image(),
  MOVE_WEST: new Image(),
  MOVE_EAST: new Image(),
  MOVE_NORDWEST: new Image(),
  MOVE_NORDEAST: new Image(),
  MOVE_SOUTHWEST: new Image(),
  MOVE_SOUTHEAST: new Image(),
  ATTACK_NORD: new Image(),
  ATTACK_SOUTH: new Image(),
  ATTACK_WEST: new Image(),
  ATTACK_EAST: new Image(),
  ATTACK_NORDWEST: new Image(),
  ATTACK_NORDEAST: new Image(),
  ATTACK_SOUTHWEST: new Image(),
  ATTACK_SOUTHEAST: new Image(),
  TILES_WALLLOW: new Image(),
  TILES_WALLHIGH: new Image(),
  TILES_FLOOR: new Image(),
};

let player = {
  type: "player",
  actions: { up: false, down: false, left: false, right: false, attack: false },

  currentDirection: "NORD",
  previousDirection: "NORD",

  position: {
    x: 256,
    y: 256,
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
