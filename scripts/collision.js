function checkCollision(object_1, object_2) {
  //at this moment only movable objects have "circle" collision model
  if (object_1 != object_2) {
    if (object_1.collisionModel === "circle") {
      if (object_2.collisionModel === "circle") {
        let distance = Math.pow(object_1.nextPosition.x - object_2.currentPosition.x, 2) + Math.pow(object_1.nextPosition.y - object_2.currentPosition.y, 2);
        if (distance < Math.pow(object_1.size + object_2.size, 2)) {
          //object_1.isMoveAvailable = false;
          collisionHandler(object_1, object_2);
        }
      }
      //object_2.collisionModel === "square"
      else {
        if (!(Math.abs(object_1.nextPosition.x - object_2.currentPosition.x) - 1 > object_1.size + object_2.sizeX || Math.abs(object_1.nextPosition.y - object_2.currentPosition.y) - 1 > object_1.size + object_2.sizeY)) {
          //object_1.isMoveAvailable = false;
          collisionHandler(object_1, object_2);
        }
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

  if (object.tilesArrayInfo.length != 0) {
    for (let elem of object.tilesArrayInfo) {
      delete worldTilesArray[elem][id];
    }
  }
  object.tilesArrayInfo.length = 0;

  if (object.collisionModel === "circle") {
    tileXMin = Math.floor((object.currentPosition.x - object.size) / tileSize);
    tileYMin = Math.floor((object.currentPosition.y - object.size) / tileSize);
    tileXMax = Math.floor((object.currentPosition.x + object.size - 1) / tileSize);
    if (tileXMax < 0) {
      tileXMax = 0;
    }
    tileYMax = Math.floor((object.currentPosition.y + object.size - 1) / tileSize);
    if (tileYMax < 0) {
      tileYMax = 0;
    }
  } else {
    tileXMin = Math.floor((object.currentPosition.x - object.sizeX) / tileSize);
    tileYMin = Math.floor((object.currentPosition.y - object.sizeY) / tileSize);

    tileXMax = Math.floor((object.currentPosition.x + object.sizeX - 1) / tileSize);
    if (tileXMax < 0) {
      tileXMax = 0;
    }
    tileYMax = Math.floor((object.currentPosition.y + object.sizeY - 1) / tileSize);
    if (tileYMax < 0) {
      tileYMax = 0;
    }
  }

  object.tileXMin = tileXMin;
  object.tileYMin = tileYMin;
  object.tileXMax = tileXMax;
  object.tileYMax = tileYMax;

  for (let line = tileYMin; line <= tileYMax; line++) {
    for (let column = tileXMin; column <= tileXMax; column++) {
      position = line * worldWidth + column;
      if (!worldTilesArray[position]) {
        worldTilesArray[position] = new Object();
      }
      worldTilesArray[position][id] = object;
      object.tilesArrayInfo.push(position);
    }
  }
}

function getTilesToCheck(object) {
  let tilesToCheck = [];
  switch (object.currentDirection) {
    case "NORD":
      for (let row = object.tileYMin - 1; row <= object.tileYMin; row++) {
        for (let column = object.tileXMin; column <= object.tileXMax; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }
      break;
    case "SOUTH":
      for (let row = object.tileYMax; row <= object.tileYMax + 1; row++) {
        for (let column = object.tileXMin; column <= object.tileXMax; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }
      break;
    case "WEST":
      for (let row = object.tileYMin; row <= object.tileYMax; row++) {
        for (let column = object.tileXMin - 1; column <= object.tileXMin; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }
      break;
    case "EAST":
      for (let row = object.tileYMin; row <= object.tileYMax; row++) {
        for (let column = object.tileXMax; column <= object.tileXMax + 1; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }
      break;
    case "NORDWEST":
      for (let row = object.tileYMin - 1; row <= object.tileYMax; row++) {
        for (let column = object.tileXMin - 1; column <= object.tileXMin; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }

      for (let row = object.tileYMin - 1; row <= object.tileYMin; row++) {
        for (let column = object.tileXMin + 1; column <= object.tileXMax; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }

      break;
    case "NORDEAST":
      for (let row = object.tileYMin - 1; row <= object.tileYMax; row++) {
        for (let column = object.tileXMax; column <= object.tileXMax + 1; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }

      for (let row = object.tileYMin - 1; row <= object.tileYMin; row++) {
        for (let column = object.tileXMin; column <= object.tileXMax - 1; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }
      break;
    case "SOUTHWEST":
      for (let row = object.tileYMin; row <= object.tileYMax + 1; row++) {
        for (let column = object.tileXMin - 1; column <= object.tileXMin; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }

      for (let row = object.tileYMax; row <= object.tileYMax + 1; row++) {
        for (let column = object.tileXMin + 1; column <= object.tileXMax; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }
      break;
    case "SOUTHEAST":
      for (let row = object.tileYMin; row <= object.tileYMax + 1; row++) {
        for (let column = object.tileXMax; column <= object.tileXMax + 1; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }

      for (let row = object.tileYMax; row <= object.tileYMax + 1; row++) {
        for (let column = object.tileXMin; column <= object.tileXMax - 1; column++) {
          tilesToCheck.push(row * worldWidth + column);
        }
      }
      break;
  }
  return tilesToCheck;
}

function getObjectsToCheck(array) {
  let objectsToCheck = {};
  let tmp = null;

  for (let elem of array) {
    tmp = worldTilesArray[elem];
    if (tmp != undefined) {
      for (let property in tmp) {
        objectsToCheck[property] = tmp[property];
      }
    }
  }
  return objectsToCheck;
}

//
function collisionHandler(object_1, object_2) {
  switch (object_1.type) {
    case "PLAYER":
      switch (object_2.type) {
        case "NONCOLLIDING":
          break;
        case "NON_STATIC_OBJECT":
          object_2.interaction(object_1, object_2);
          //deleteObject(object_2);
          break;
        case "NPC_PROJECTILE":
          console.log("collision with npc projectile");
        case "PLAYER_PROJECTILE":
          break;
        default:
          object_1.isMoveAvailable = false;
      }
      break;
    case "NPC":
      switch (object_2.type) {
        case "NONCOLLIDING":
          break;
        case "PLAYER_PROJECTILE":
          console.log("collision with player projectile");
          break;
        default:
          object_1.isMoveAvailable = false;
      }
      break;
    case "PLAYER_PROJECTILE":
      switch (object_2.type) {
        case "NONCOLLIDING":
          break;
        case "PLAYER":
          break;
        case "NPC":
          console.log("collision with npc");
          object_1.doDamage(object_2);
          object_1.mustBeDeleted = true;
          break;
        case "STATIC_OBJECT":
          if (object_2.subtype === "HIGH") {
            object_1.isMoveAvailable = false;
            console.log("collision with static object");
            object_1.mustBeDeleted = true;
          }
          break;
        case "NON_STATIC_OBJECT":
          if (object_2.subtype === "HIGH") {
            console.log("collision with non static object");
          }
          break;
      }
      break;
    case "NPC_PROJECTILE":
      switch (object_2.type) {
        case "NONCOLLIDING":
          break;
        case "PLAYER":
          console.log("collision with player");
          object_1.doDamage(object_2);
          break;
        case "STATIC_OBJECT":
          if (object_2.subtype === "HIGH") {
            console.log("collision with static object");
          }
          break;
      }
      break;
  }
}
//

function deleteFromWorldTilesArray(object) {
  let id = object.id;
  for (let elem of object.tilesArrayInfo) {
    delete worldTilesArray[elem][id];
  }
}

function deleteObject(object) {
  deleteFromWorldTilesArray(object);
  switch (object.type) {
    case "PLAYER_PROJECTILE":
      projectiles.delete(object);
      break;
    case "NPC_PROJECTILE":
      projectiles.delete(object);
      break;
    case "CHARACTER":
      characters.delete(object);
      break;
    case "NON_STATIC_OBJECT":
      worldNonStaticObjects.delete(object);
      break;
  }
}
