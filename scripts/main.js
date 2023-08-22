let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentTimestamp = 0;
let previousTimestamp = 0;
let timeDifference = 0;
let globalID = 0;

let imageBitmaps = [];
let tmpImageData = [];
let animations = {};

//
let charactersToLoad = [["NPC", "SPIDER", { x: 320, y: 128 }, 20, 0.2, 0.15, 80, { IDLE: 1, MOVE: 1, ATTACK: 1 }, 500, 500]];
//
//
let selectedCharacter = "ARCHER";
let animationsToLoad = ["ARCHER", "ORC", "SPIDER", "TILES", "TREASURE_1", "TREASURECHEST", "HEALTH"];
//
let player = null;

let worldStaticObjects = [];
//let worldNonStaticObjects = [];
let characters = [];
//let projectiles = [];

//let worldStaticObjects = new LinkedList();
let worldNonStaticObjects = new LinkedList();
//let characters = new LinkedList();
let projectiles = new LinkedList();

//
let worldMap = [
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [0, 3],
  [0, 3],
  [0, 3],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0, 5],
  [2],
  [2],
  [2],
  [0, 3],
  [0],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0, 3],
  [0],
  [0, 4],
  [0],
  [2],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [2],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [2],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [2],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [0],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
  [2],
];
//
let worldWidth = 21;
let worldHeight = 16;
let tileSize = 32;
//

let worldTilesArray = {};

function start() {
  previousTimestamp = currentTimestamp;
  currentTimestamp = Date.now();
  timeDifference = currentTimestamp - previousTimestamp;

  projectiles.forEach((projectile) => moveCharacter(projectile, timeDifference)); // same method realization

  getPlayerActions();
  setCharacterDirection(player);
  setCharacterState(player);
  moveCharacter(player, timeDifference);

  characters.forEach((character) => moveCharacter(character, timeDifference));

  drawVisibleArea();
  /*worldStaticObjects.forEach((object) => drawWorldObject(object));
  projectiles.forEach((projectile) => drawProjectile(projectile));
  drawCharacter(player);
  characters.forEach((character) => drawCharacter(character));*/

  window.requestAnimationFrame(start);
}

loadResourses(animationsToLoad);

setTimeout(() => {
  createPlayerCharacter(getID(), "PLAYER", selectedCharacter, { x: 320, y: 240 }, 14, 0.2, 0.15, 80, { IDLE: 1, MOVE: 1, ATTACK: 1 }, 400, 1000);

  for (let elem of charactersToLoad) {
    createNonPlayerCharacter(getID(), ...elem);
  }

  createWorldObjects(worldMap);

  start();
}, 100);
