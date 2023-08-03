let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentTimestamp = 0;
let previousTimestamp = 0;
let timeDifference = 0;

let imageBitmaps = [];
let tmpImageData = [];
let animations = {};

//
let charactersToLoad = [["SPIDER", { x: 256, y: 128 }, 20, 0.2, 0.15, 80, { IDLE: 1, MOVE: 1, ATTACK: 1 }, 500]];
//
let selectedCharacter = "ARCHER";
let animationsToLoad = ["ARCHER", "ORC", "SPIDER", "TILES"];
let player = null;
let characters = [];
let projectiles = [];
let worldStaticObjects = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
let collisiontiles = [];

function start() {
  previousTimestamp = currentTimestamp;
  currentTimestamp = Date.now();
  timeDifference = currentTimestamp - previousTimestamp;
  drawStaticObject(worldStaticObjects);

  projectiles.forEach((projectile) => moveCharacter(projectile, timeDifference)); // same method realization
  projectiles.forEach((projectile) => drawProjectile(projectile));

  getPlayerActions();
  setCharacterDirection(player);
  setCharacterState(player);
  moveCharacter(player, timeDifference);
  drawCharacter(player);

  characters.forEach((character) => moveCharacter(character));
  characters.forEach((character) => drawCharacter(character));

  window.requestAnimationFrame(start);
}

loadResourses(animationsToLoad);
////type, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation = { IDLE: 1, MOVE: 1, ATTACK: 1 }, attackSpeed
setTimeout(() => {
  createPlayerCharacter(selectedCharacter, { x: 64, y: 128 }, 20, 0.2, 0.15, 80, { IDLE: 1, MOVE: 1, ATTACK: 1 }, 400);
}, 100);
setTimeout(() => {
  for (let elem of charactersToLoad) {
    createNonPlayerCharacter(elem[0], elem[1]);
  }
}, 150);

setTimeout(start, 250);
