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
    return;
  }
  if (character.actions.up || character.actions.down || character.actions.left || character.actions.right) {
    character.currentState = "MOVE";
  } else {
    character.currentState = "IDLE";
  }
}

//____Update_model____

function moveCharacter(character, deltaTime) {
  character.linar_moving = character.speed * deltaTime;
  character.diagonal_moving = character.diagSpeed * deltaTime;

  if (character.currentState == "MOVE") {
    switch (character.currentDirection) {
      case "NORD":
        character.position.y -= character.linar_moving;
        break;
      case "SOUTH":
        character.position.y += character.linar_moving;
        break;
      case "WEST":
        character.position.x -= character.linar_moving;
        break;
      case "EAST":
        character.position.x += character.linar_moving;
        break;
      case "NORDWEST":
        character.position.x -= character.diagonal_moving;
        character.position.y -= character.diagonal_moving;
        break;
      case "NORDEAST":
        character.position.x += character.diagonal_moving;
        character.position.y -= character.diagonal_moving;
        break;
      case "SOUTHWEST":
        character.position.x -= character.diagonal_moving;
        character.position.y += character.diagonal_moving;
        break;
      case "SOUTHEAST":
        character.position.x += character.diagonal_moving;
        character.position.y += character.diagonal_moving;
        break;
    }
  }
}

function checkCollision(object_1, object_2, callback) {
  return;
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

/*function checkCollision(character) {
  let characterTileY = Math.floor(character.position.y / 64);
  let characterTileX = Math.floor(character.position.x / 64);
  console.log("x " + x);
  console.log("y " + y);

  let distanceToClosestTile = 0;

  switch (character.currentDirection) {
    case "NORD":
      if (worldStaticObjects[(y - 1) * 10 + x] != 0) {
        distanceToClosestTile = (character.position.y - character.size) % 64;
        if (distanceToClosestTile < character.linar_moving) {
          character.linar_moving = distanceToClosestTile;
        }
      }
      break;
    case "SOUTH":
      if (worldStaticObjects[(y + 1) * 10 + x] != 0) {
        distanceToClosestTile = (y + 1) * 64 - character.position.y + character.size;
        if (distanceToClosestTile < character.linar_moving) {
          character.linar_moving = distanceToClosestTile;
        }
      }
      break;
    case "WEST":
      if (worldStaticObjects[y * 10 + x] != 0) {
        distanceToClosestTile = character.position.x - (x + 1) * 64;
        if (distanceToClosestTile < character.linar_moving) {
          character.linar_moving = distanceToClosestTile;
        }
      }
      break;
    case "EAST":
      if (worldStaticObjects[y * 10 + x] != 0) {
        distanceToClosestTile = x * 64 - character.position.x;
        if (distanceToClosestTile < character.linar_moving) {
          character.linar_moving = distanceToClosestTile;
        }
      }
      break;
    case "NORDWEST":
      break;
    case "NORDEAST":
      break;
    case "SOUTHWEST":
      break;
    case "SOUTHEAST":
      break;
  }
}*/
