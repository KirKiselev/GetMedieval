function getID() {
  globalID++;
  return "objectNumber" + globalID;
}

function createPlayerCharacter(id, type, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed) {
  player = new Character(id, type, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed);
  updateWorldTilesArray(player);
}

function createNonPlayerCharacter(id, type, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed) {
  characters.push(new Character(id, type, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation, attackSpeed));
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
          worldObjects.push(new WorldObject(getID(), "TILES_WALLLOW", { x: line * 32 + 16, y: row * 32 + 16 }, 16, 16, 1000));
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

    //checkCollision(character, characters[0]);
    checkCollision(character, worldObjects[0]);
    //updateWorldTilesArray(character);
  }
}

function checkCollision(
  object_1,
  object_2,
  callback = () => {
    console.log("CALLBACK");
  }
) {
  if (object_1.collisionModel === "circle") {
    if (object_2.collisionModel === "circle") {
      let distance = Math.pow(object_1.nextPosition.x - object_2.currentPosition.x, 2) + Math.pow(object_1.nextPosition.y - object_2.currentPosition.y, 2);
      if (distance >= Math.pow(object_1.size + object_2.size, 2)) {
        //
        object_1.currentPosition.x = object_1.nextPosition.x;
        object_1.currentPosition.y = object_1.nextPosition.y;
        //
      }
    }
    //object_2.collisionModel === "square"
    else {
      if (Math.abs(object_1.nextPosition.x - object_2.currentPosition.x) >= object_1.size + object_2.sizeX || Math.abs(object_1.nextPosition.y - object_2.currentPosition.y) >= object_1.size + object_2.sizeY) {
        object_1.currentPosition.x = object_1.nextPosition.x;
        object_1.currentPosition.y = object_1.nextPosition.y;
      }
    }
  }
}

function updateWorldTilesArray(object) {
  let tileXMin = 0;
  let tileXMax = 0;
  let tileYMin = 0;
  let tileYMax = 0;
  let position = 0;
  let id = object.id;

  if (object.collisionModel === "circle") {
    tileXMin = Math.floor((object.currentPosition.x - object.size) / 32);
    tileYMin = Math.floor((object.currentPosition.y - object.size) / 32);
    tileXMax = Math.floor((object.currentPosition.x + object.size) / 32);
    tileYMax = Math.floor((object.currentPosition.y + object.size) / 32);
  } else {
    tileXMin = Math.floor((object.currentPosition.x - object.sizeX - 1) / 32);
    if (tileXMin < 0) {
      tileXMin = 0;
    }
    tileYMin = Math.floor((object.currentPosition.y - object.sizeY - 1) / 32);
    if (tileYMin < 0) {
      tileYMin = 0;
    }
    tileXMax = Math.floor((object.currentPosition.x + object.sizeX - 1) / 32);
    if (tileXMax < 0) {
      tileXMax = 0;
    }
    tileYMax = Math.floor((object.currentPosition.y + object.sizeY - 1) / 32);
    if (tileYMax < 0) {
      tileYMax = 0;
    }
  }

  for (let line = tileYMin; line <= tileYMax; line++) {
    for (let column = tileXMin; column <= tileXMax; column++) {
      position = line * 20 + column;
      if (!worldTilesArray[position]) {
        worldTilesArray[position] = new Object();
      }
      worldTilesArray[position][id] = object;
    }
  }
}

function getTilesToCheck(character) {
  let y = Math.floor(character.position.y / 64);
  let x = Math.floor(character.position.x / 64);
  let tilesArray = [];
  switch (character.currentDirection) {
    case "NORD":
      tilesArray = [(y - 1) * 10 + x - 1, (y - 1) * 10 + x - 1, (y - 1) * 10 + x - 1];
      break;
    case "SOUTH":
      tilesArray = [y * 10 + x - 1, y * 10 + x, y * 10 + x + 1];
      break;
    case "WEST":
      tilesArray = [(y - 2) * 10 + x - 1, (y - 1) * 10 + x - 1, y * 10 + x - 1];
      break;
    case "EAST":
      tilesArray = [(y - 2) * 10 + x + 1, (y - 1) * 10 + x + 1, y * 10 + x + 1];
      break;
    case "NORDWEST":
      tilesArray = [(y - 1) * 10 + x - 1, (y - 2) * 10 + x - 1, (y - 2) * 10 + x];
      break;
    case "NORDEAST":
      tilesArray = [(y - 2) * 10 + x, (y - 2) * 10 + x + 1, (y - 1) * 10 + x + 1];
      break;
    case "SOUTHWEST":
      tilesArray = [(y - 1) * 10 + x - 1, y * 10 + x - 1, y * 10 + x];
      break;
    case "SOUTHEAST":
      tilesArray = [(y - 1) * 10 + x + 1, y * 10 + x + 1, y * 10 + x];
      break;
  }
  return tilesArray;
}
