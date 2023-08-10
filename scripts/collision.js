/*function checkCollision(object_1, object_2) {
  if (object_1 != object_2) {
    if (object_1.collisionModel === "circle") {
      if (object_2.collisionModel === "circle") {
        let distance = Math.pow(object_1.nextPosition.x - object_2.currentPosition.x, 2) + Math.pow(object_1.nextPosition.y - object_2.currentPosition.y, 2);
        if (distance >= Math.pow(object_1.size + object_2.size, 2)) {
          //
          object_1.currentPosition.x = object_1.nextPosition.x;
          object_1.currentPosition.y = object_1.nextPosition.y;
          return;
          //
        }
        console.log("collision with " + object_2.id);
      }
      //object_2.collisionModel === "square"
      else {
        if (Math.abs(object_1.nextPosition.x - object_2.currentPosition.x) >= object_1.size + object_2.sizeX || Math.abs(object_1.nextPosition.y - object_2.currentPosition.y) >= object_1.size + object_2.sizeY) {
          object_1.currentPosition.x = object_1.nextPosition.x;
          object_1.currentPosition.y = object_1.nextPosition.y;
          return;
        }
        console.log("collision with " + object_2.id);
      }
    }
  }
}*/

function checkCollision(object_1, object_2) {
  if (object_1 != object_2 && object_1.isPlayer != object_2.isPlayer) {
    if (object_1.collisionModel === "circle") {
      if (object_2.collisionModel === "circle") {
        let distance = Math.pow(object_1.nextPosition.x - object_2.currentPosition.x, 2) + Math.pow(object_1.nextPosition.y - object_2.currentPosition.y, 2);
        if (distance < Math.pow(object_1.size + object_2.size, 2)) {
          object_1.isMoveAvailable = false;
        }
      }
      //object_2.collisionModel === "square"
      else {
        if (!(Math.abs(object_1.nextPosition.x - object_2.currentPosition.x) - 1 > object_1.size + object_2.sizeX || Math.abs(object_1.nextPosition.y - object_2.currentPosition.y) - 1 > object_1.size + object_2.sizeY)) {
          object_1.isMoveAvailable = false;
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
      delete worldTilesArray[elem][object.id];
    }
  }
  object.tilesArrayInfo.length = 0;

  if (object.collisionModel === "circle") {
    tileXMin = Math.floor((object.currentPosition.x - object.size) / 32);
    tileYMin = Math.floor((object.currentPosition.y - object.size) / 32);
    tileXMax = Math.floor((object.currentPosition.x + object.size - 1) / 32);
    if (tileXMax < 0) {
      tileXMax = 0;
    }
    tileYMax = Math.floor((object.currentPosition.y + object.size - 1) / 32);
    if (tileYMax < 0) {
      tileYMax = 0;
    }
  } else {
    tileXMin = Math.floor((object.currentPosition.x - object.sizeX) / 32);
    tileYMin = Math.floor((object.currentPosition.y - object.sizeY) / 32);

    tileXMax = Math.floor((object.currentPosition.x + object.sizeX - 1) / 32);
    if (tileXMax < 0) {
      tileXMax = 0;
    }
    tileYMax = Math.floor((object.currentPosition.y + object.sizeY - 1) / 32);
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
