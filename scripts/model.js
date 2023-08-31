function getID() {
  globalID++;
  return "objectNumber" + globalID;
}

function createPlayerCharacter(id, type, animationName, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed, health, projectileSize, attackDistance = null) {
  player = new Character(id, type, animationName, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed, health, projectileSize, attackDistance);
  updateWorldTilesArray(player);
}
//constructor(id, type, animationName, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation = { IDLE: 1, MOVE: 1, ATTACK: 1 }, timeBetweenAttacks, health)
function createNonPlayerCharacter(id, type, animationName, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed, health, projectileSize, attackDistance = undefined) {
  characters.push(new Character(id, type, animationName, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed, health, projectileSize, (attackDistance = size + 2)));
  updateWorldTilesArray(characters[characters.length - 1]);
}

function createWorldObjects(map) {
  let cell = 0;
  for (let row = 0; row < worldHeight; row++) {
    for (let line = 0; line < worldWidth; line++) {
      cell = worldWidth * row + line;
      switch (map[cell][0]) {
        case 0:
          worldStaticObjects.push(new WorldObject(getID(), "NONCOLLIDING", "LOW", "TILES_FLOOR", { x: line * 32 + 16, y: row * 32 + 16 }, 16, 16, 1000));
          updateWorldTilesArray(worldStaticObjects[worldStaticObjects.length - 1]);
          break;
        case 1:
          worldStaticObjects.push(new WorldObject(getID(), "STATIC_OBJECT", "LOW", "TILES_WALLLOW", { x: line * 32 + 16, y: row * 32 + 16 }, 16, 16, 1000));
          //
          updateWorldTilesArray(worldStaticObjects[worldStaticObjects.length - 1]);
          //
          break;
        case 2:
          worldStaticObjects.push(new WorldObject(getID(), "STATIC_OBJECT", "HIGH", "TILES_WALLHIGH", { x: line * 32 + 16, y: row * 32 + 16 }, 16, 16, 1000));
          //
          updateWorldTilesArray(worldStaticObjects[worldStaticObjects.length - 1]);
          //
          break;
      }
      switch (map[cell][1]) {
        case 3:
          worldNonStaticObjects.push(new WorldObject(getID(), "NON_STATIC_OBJECT", "LOW", "TREASURE_1", { x: line * 32 + 16, y: row * 32 + 16 }, 8, 8, 1000));
          worldNonStaticObjects.end.value.interaction = (object_1, object_2) => {
            object_1.score += 100;
            deleteObject(object_2);
          };
          //
          updateWorldTilesArray(worldNonStaticObjects.end.value);
          //
          break;
        case 4:
          worldNonStaticObjects.push(new WorldObject(getID(), "NON_STATIC_OBJECT", "HIGH", "TREASURECHEST", { x: line * 32 + 16, y: row * 32 + 16 }, 14, 14, 80));
          worldNonStaticObjects.end.value.interaction = (object) => {
            return;
          };
          //
          updateWorldTilesArray(worldNonStaticObjects.end.value);
          //
          break;
        case 5:
          worldNonStaticObjects.push(new WorldObject(getID(), "NON_STATIC_OBJECT", "LOW", "HEALTH", { x: line * 32 + 16, y: row * 32 + 16 }, 16, 16, 80));
          worldNonStaticObjects.end.value.interaction = (object_1, object_2) => {
            object_1.health += 100;
            deleteObject(object_2);
          };
          //
          updateWorldTilesArray(worldNonStaticObjects.end.value);
          //
          break;
      }
    }
  }
}

function setCharacterDirection(character) {
  character.previousDirection = character.currentDirection;

  if (character.actions.up === true) {
    if (character.actions.left === true) {
      character.currentDirection = "NORDWEST";
      return;
    }
    if (character.actions.right === true) {
      character.currentDirection = "NORDEAST";
      return;
    }
    character.currentDirection = "NORD";
    return;
  }
  //
  if (character.actions.down === true) {
    if (character.actions.left === true) {
      character.currentDirection = "SOUTHWEST";
      return;
    }
    if (character.actions.right === true) {
      character.currentDirection = "SOUTHEAST";
      return;
    }
    character.currentDirection = "SOUTH";
    return;
  }
  //
  if (character.actions.left === true) {
    if (character.actions.up === true) {
      character.currentDirection = "NORDWEST";
      return;
    }
    if (character.actions.down === true) {
      character.currentDirection = "SOUTHWEST";
      return;
    }
    character.currentDirection = "WEST";
    return;
  }
  //
  if (character.actions.right === true) {
    if (character.actions.up === true) {
      character.currentDirection = "NORDEAST";
      return;
    }
    if (character.actions.down === true) {
      character.currentDirection = "SOUTHEAST";
      return;
    }
    character.currentDirection = "EAST";
    return;
  }
}

function setCharacterState(character) {
  character.previousState = character.currentState;
  if (character.actions.attack === true) {
    character.currentState = "ATTACK";
    character.attack();
    return;
  }
  if (character.actions.up || character.actions.down || character.actions.left || character.actions.right) {
    character.currentState = "MOVE";
  } else {
    character.currentState = "IDLE";
  }
}

function moveCharacter(character, deltaTime) {
  let tiles = [];
  let objects = [];

  character.isMoveAvailable = true;
  character.linarMoving = character.speed * deltaTime;
  character.diagonalMoving = character.diagSpeed * deltaTime;

  if (character.currentState === "MOVE") {
    switch (character.currentDirection) {
      case "NORD":
        character.nextPosition.y = character.currentPosition.y - character.linarMoving;
        break;
      case "SOUTH":
        character.nextPosition.y = character.currentPosition.y + character.linarMoving;
        break;
      case "WEST":
        character.nextPosition.x = character.currentPosition.x - character.linarMoving;
        break;
      case "EAST":
        character.nextPosition.x = character.currentPosition.x + character.linarMoving;
        break;
      case "NORDWEST":
        character.nextPosition.x = character.currentPosition.x - character.diagonalMoving;
        character.nextPosition.y = character.currentPosition.y - character.diagonalMoving;
        break;
      case "NORDEAST":
        character.nextPosition.x = character.currentPosition.x + character.diagonalMoving;
        character.nextPosition.y = character.currentPosition.y - character.diagonalMoving;
        break;
      case "SOUTHWEST":
        character.nextPosition.x = character.currentPosition.x - character.diagonalMoving;
        character.nextPosition.y = character.currentPosition.y + character.diagonalMoving;
        break;
      case "SOUTHEAST":
        character.nextPosition.x = character.currentPosition.x + character.diagonalMoving;
        character.nextPosition.y = character.currentPosition.y + character.diagonalMoving;
        break;
    }

    tiles = getTilesToCheck(character);
    objects = getObjectsToCheck(tiles);

    for (let elem in objects) {
      checkCollision(character, objects[elem]);
    }
    if (!character.mustBeDeleted) {
      if (character.isMoveAvailable) {
        character.currentPosition.x = character.nextPosition.x;
        character.currentPosition.y = character.nextPosition.y;
        updateWorldTilesArray(character);
      } else {
        character.nextPosition.x = character.currentPosition.x;
        character.nextPosition.y = character.currentPosition.y;
      }
    } else {
      //deleteFromWorldTilesArray(character);
      deleteObject(character);
    }
  }
}

function getObjectsToActivation() {
  let tileXMin = Math.max(0, Math.floor(player.tileXMin - visibleAreaWidth / 2));
  let tileXMax = Math.min(worldWidth - 1, Math.floor(player.tileXMax + visibleAreaWidth / 2));
  let tileYMin = Math.max(0, Math.floor(player.tileYMin - visibleAreaHeight / 2));
  let tileYMax = Math.min(worldHeight - 1, Math.floor(player.tileYMax + visibleAreaHeight / 2));
  let objectsInArea = {};
  let charactersInArea = {};
  let cell = 0;
  let tmp = null;

  for (let row = tileYMin; row < tileYMax; row++) {
    for (let column = tileXMin; column < tileXMax; column++) {
      cell = row * worldWidth + column;
      for (let elem in worldTilesArray[cell]) {
        if (worldTilesArray[cell][elem].type === "NPC") {
          tmp = worldTilesArray[cell][elem].id;
          if (charactersInArea[tmp] === undefined) {
            charactersInArea[tmp] = worldTilesArray[cell][elem];
          }
        }
        if (worldTilesArray[cell][elem].haveActiveAbilities === true) {
          if (objectsInArea[tmp] === undefined) {
            objectsInArea[tmp] = worldTilesArray[cell][elem];
          }
        }
      }
    }
  }

  return [charactersInArea, objectsInArea];
}

function setInactive(character) {
  character.actions.up = false;
  character.actions.down = false;
  character.actions.left = false;
  character.actions.right = false;
  character.actions.attack = false;
}
