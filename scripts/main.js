let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let currentTimestamp = 0;
let previousTimestamp = 0;
let timeDifference = 0;

let mainImage;
let imageBitmaps = [];
let tmpImageData = [];
let animations = {};

let selectedCharacter = "ARCHER";
let animationsToLoad = ["ARCHER", "ORC", "SPIDER", "TILES"];
let characters = [character_1, character_2];
let worldStaticObjects = [
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
];
let collisiontiles = [];

function start() {
  previousTimestamp = currentTimestamp;
  currentTimestamp = Date.now();
  timeDifference = currentTimestamp - previousTimestamp;
  getPlayerActions();

  setCharacterDirection(player);
  setCharacterState(player);

  moveCharacter(player, timeDifference);

  drawStaticObject(worldStaticObjects);

  drawCharacter(player);
  //characters.forEach((character) => drawCharacter(character));

  window.requestAnimationFrame(start);
}

loadResourses(animationsToLoad);
setTimeout(addCharacterAnimation, 150);

setTimeout(start, 250);
