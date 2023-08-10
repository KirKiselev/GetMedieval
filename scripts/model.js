function getID() {
  globalID++;
  return "objectNumber" + globalID;
}

function createPlayerCharacter(id, isPlayer, type, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed) {
  player = new Character(id, isPlayer, type, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed);
  updateWorldTilesArray(player);
}

function createNonPlayerCharacter(id, isPlayer, type, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed) {
  characters.push(new Character(id, isPlayer, type, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed));
  updateWorldTilesArray(characters[characters.length - 1]);
}

function createWorldObjects(map) {
  let cell = 0;
  for (let row = 0; row < 16; row++) {
    for (let line = 0; line < 20; line++) {
      cell = 20 * row + line;
      switch (map[cell]) {
        case 1:
          worldObjects.push(new WorldObject(getID(), "TILES_WALLLOW", { x: line * 32 + 16, y: row * 32 + 16 }, 16, 16, 1000));
          //
          updateWorldTilesArray(worldObjects[worldObjects.length - 1]);
          //
          break;
        case 2:
          worldObjects.push(new WorldObject(getID(), "TILES_WALLHIGH", { x: line * 32 + 16, y: row * 32 + 16 }, 16, 16, 1000));
          //
          updateWorldTilesArray(worldObjects[worldObjects.length - 1]);
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

    checkCollision(character, worldObjects[0]);
    for (let elem in objects) {
      checkCollision(character, objects[elem]);
    }

    if (character.isMoveAvailable) {
      character.currentPosition.x = character.nextPosition.x;
      character.currentPosition.y = character.nextPosition.y;
    }

    updateWorldTilesArray(character);
  }
}
