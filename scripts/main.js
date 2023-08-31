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
let charactersToLoad = [["NPC", "SPIDER", { x: 320 + 16, y: 128 + 16 }, 12, 0.1, 0.075, 80, { IDLE: 1, MOVE: 1, ATTACK: 1 }, 500, 500, 20]];
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

let tileSize = 32;
//

let worldTilesArray = {};

let flag = false;

function start() {
  let [activeCharacters, activeObjects] = getObjectsToActivation();
  let currentNPC;

  previousTimestamp = currentTimestamp;
  currentTimestamp = Date.now();
  if (previousTimestamp === 0) {
    previousTimestamp = currentTimestamp - 16;
  }
  timeDifference = currentTimestamp - previousTimestamp;

  projectiles.forEach((projectile) => moveCharacter(projectile, timeDifference)); // same method realization

  setCharacterDirection(player);
  setCharacterState(player);
  moveCharacter(player, timeDifference);

  for (let characterID in activeCharacters) {
    currentNPC = activeCharacters[characterID];

    if (isAttackDistanceReach(currentNPC, player)) {
      if (isTargetOnFiringLine(currentNPC, player)) {
        currentNPC.path = undefined;
        attackTarget();
      } else {
        findPath(currentNPC, player);
      }
    } else {
      if (currentNPC.path === undefined) {
        findPath(currentNPC, player);
      } else {
        if (!isPathActual(currentNPC, player)) {
          findPath(currentNPC, player);
        }
      }

      moveToTile(currentNPC, currentNPC.path[0]);
    }

    setCharacterDirection(currentNPC);
    setCharacterState(currentNPC);
    moveCharacter(currentNPC, timeDifference);
  }

  /*characters.forEach((character) => {
    setCharacterDirection(character);
    setCharacterState(character);
    moveCharacter(character, timeDifference);
  });*/

  drawVisibleArea();
  /*worldStaticObjects.forEach((object) => drawWorldObject(object));
  projectiles.forEach((projectile) => drawProjectile(projectile));
  drawCharacter(player);
  characters.forEach((character) => drawCharacter(character));*/

  window.requestAnimationFrame(start);
}

loadResourses(animationsToLoad);

setTimeout(() => {
  createPlayerCharacter(getID(), "PLAYER", selectedCharacter, { x: 384, y: 240 }, 14, 0.2, 0.15, 80, { IDLE: 1, MOVE: 1, ATTACK: 1 }, 400, 1000, 1);
  getPlayerActions();

  for (let elem of charactersToLoad) {
    createNonPlayerCharacter(getID(), ...elem);
  }

  createWorldObjects(worldMap);

  start();
}, 100);
