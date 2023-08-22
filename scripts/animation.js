//____ Methods for allmap displaying ____
function drawCharacter(character) {
  let x = character.currentPosition.x - character.currentAnimation.frame.width / 2;
  let y = character.currentPosition.y - character.currentAnimation.frame.height / 2;

  if (character.previousState === character.currentState && character.previousDirection === character.currentDirection) {
    ctx.drawImage(character.currentAnimation.frame, x, y);
    if (currentTimestamp - character.lastFrameDrawtime >= character.currentTimeBetweenFrames) {
      character.currentAnimation = character.currentAnimation.next;
      character.lastFrameDrawtime = currentTimestamp;
    }
  } else {
    animationName = character.animationName + "_" + character.currentState + "_" + character.currentDirection;
    character.currentAnimation = animations[animationName].animationStart;
    ctx.drawImage(character.currentAnimation.frame, x, y);
    character.currentAnimation = character.currentAnimation.next;
    character.lastFrameDrawtime = currentTimestamp;
  }
}

function drawProjectile(projectile) {
  let x = projectile.currentPosition.x - projectile.currentAnimation.frame.width / 2;
  let y = projectile.currentPosition.y - projectile.currentAnimation.frame.height / 2;

  ctx.drawImage(projectile.currentAnimation.frame, x, y);
  if (currentTimestamp - projectile.lastFrameDrawtime >= projectile.currentTimeBetweenFrames) {
    projectile.currentAnimation = projectile.currentAnimation.next;
    projectile.lastFrameDrawtime = currentTimestamp;
  }
}

function drawWorldObject(object) {
  let x = object.currentPosition.x - object.currentAnimation.frame.width / 2;
  let y = object.currentPosition.y - object.currentAnimation.frame.height / 2;

  ctx.drawImage(object.currentAnimation.frame, x, y);
  if (currentTimestamp - object.lastFrameDrawtime >= object.currentTimeBetweenFrames) {
    object.currentAnimation = object.currentAnimation.next;
    object.lastFrameDrawtime = currentTimestamp;
  }
}
//____ Methods for allmap displaying ____

//____ Movable camera ____
let resolutionX = 320;
let resolutionY = 240;
let visibleAreaWidth = Math.floor(resolutionX / 32) + 1;
let visibleAreaHeight = Math.floor(resolutionY / 32) + 1;

function drawVisibleArea() {
  let correctionX = 0;
  let correctionY = 0;
  let cameraPositionX = 0; //topleft point
  let cameraPositionY = 0; //of visible area

  if (player.currentPosition.x > resolutionX / 2) {
    cameraPositionX = player.currentPosition.x - resolutionX / 2;
  }
  if (player.currentPosition.x > worldWidth * tileSize - resolutionX / 2) {
    cameraPositionX = worldWidth * tileSize - resolutionX;
  }
  if (player.currentPosition.y > resolutionY / 2) {
    cameraPositionY = player.currentPosition.y - resolutionY / 2;
  }
  if (player.currentPosition.y > worldHeight * tileSize - resolutionY / 2) {
    cameraPositionY = worldHeight * tileSize - resolutionY;
  }

  let startRow = Math.floor(cameraPositionY / tileSize);
  let startColumn = Math.floor(cameraPositionX / tileSize);
  let absoluteRow = 0;
  let absoluteColumn = 0;

  correctionX = startColumn * tileSize - cameraPositionX;
  correctionY = startRow * tileSize - cameraPositionY;
  let cell;
  // draw floor
  for (let row = 0; row <= visibleAreaHeight; row++) {
    for (let column = 0; column <= visibleAreaWidth; column++) {
      absoluteRow = row + startRow;
      absoluteColumn = column + startColumn;
      cell = absoluteRow * worldWidth + absoluteColumn;

      if (cell < worldWidth * worldHeight) {
        ctx.drawImage(worldStaticObjects[22].currentAnimation.frame, column * tileSize + correctionX, row * tileSize + correctionY);
      }
    }
  }

  for (let row = 0; row <= visibleAreaHeight; row++) {
    for (let column = 0; column <= visibleAreaWidth; column++) {
      absoluteRow = row + startRow;
      absoluteColumn = column + startColumn;
      cell = absoluteRow * worldWidth + absoluteColumn;

      if (cell < worldWidth * worldHeight) {
        let layersArray = getObjectsToDraw(cell, absoluteRow, absoluteColumn);
        //static
        if (layersArray[1]) {
          ctx.drawImage(layersArray[1].currentAnimation.frame, column * tileSize + correctionX, row * tileSize + correctionY);
        }
        //nonstatic
        if (layersArray[2]) {
          drawNoStaticObject(layersArray[2], startColumn, startRow, correctionX, correctionY);
        }
        //projectiles
        if (layersArray[3]) {
          for (let elem of layersArray[3]) {
            drawProjectile(elem, startColumn, startRow, correctionX, correctionY);
          }
        }
        //player
        if (layersArray[4]) {
          drawPlayer();
        }
        //npc
        if (layersArray[5]) {
          for (let elem of layersArray[5]) {
            drawCharacter(elem, startColumn, startRow, correctionX, correctionY);
          }
        }
      }
    }
  }
}

function getObjectsToDraw(tile, row, column) {
  let layersArray = [];
  for (let prop in worldTilesArray[tile]) {
    switch (worldTilesArray[tile][prop].type) {
      case "NONCOLLIDING":
        if (layersArray[0] == undefined) {
          layersArray[0] = worldTilesArray[tile][prop];
        } else {
          layersArray[0].push(worldTilesArray[tile][prop]);
        }
        break;
      case "STATIC_OBJECT":
        if (layersArray[1] == undefined) {
          layersArray[1] = worldTilesArray[tile][prop];
        } else {
          layersArray[1].push(worldTilesArray[tile][prop]);
        }
        break;
      case "NON_STATIC_OBJECT":
        if ((isBelongToTile(worldTilesArray[tile][prop].type), row, column)) {
          if (layersArray[2] == undefined) {
            layersArray[2] = worldTilesArray[tile][prop];
          } else {
            layersArray[2].push(worldTilesArray[tile][prop]);
          }
        }
        break;
      case "PLAYER_PROJECTILE":
        if ((isBelongToTile(worldTilesArray[tile][prop].type), row, column)) {
          if (layersArray[3] == undefined) {
            layersArray[3] = [worldTilesArray[tile][prop]];
          } else {
            layersArray[3].push(worldTilesArray[tile][prop]);
          }
        }
        break;
      case "NPC_PROJECTILE":
        if ((isBelongToTile(worldTilesArray[tile][prop].type), row, column)) {
          if (layersArray[3] == undefined) {
            layersArray[3] = [worldTilesArray[tile][prop]];
          } else {
            layersArray[3].push(worldTilesArray[tile][prop]);
          }
        }
        break;
      case "PLAYER":
        if ((isBelongToTile(worldTilesArray[tile][prop].type), row, column)) {
          if (layersArray[4] == undefined) {
            layersArray[4] = worldTilesArray[tile][prop];
          } else {
            layersArray[4].push(worldTilesArray[tile][prop]);
          }
        }
        break;
      case "NPC":
        if ((isBelongToTile(worldTilesArray[tile][prop].type), row, column)) {
          if (layersArray[5] == undefined) {
            layersArray[5] = [worldTilesArray[tile][prop]];
          } else {
            layersArray[5].push(worldTilesArray[tile][prop]);
          }
        }
        break;
    }
  }
  return layersArray;
}

function isBelongToTile(obj, row, column) {
  if (obj.tileXMax == column && obj.tileYMax == row) {
    return true;
  }
  return false;
}

function drawStaticObject() {
  return;
}

function drawNoStaticObject(object, startColumn, startRow, correctionX, correctionY) {
  ctx.drawImage(
    object.currentAnimation.frame,
    object.currentPosition.x - startColumn * tileSize - object.currentAnimation.frame.width / 2 + correctionX,
    object.currentPosition.y - startRow * tileSize - object.currentAnimation.frame.height / 2 + correctionY
  );
  if (currentTimestamp - object.lastFrameDrawtime >= object.currentTimeBetweenFrames) {
    object.currentAnimation = object.currentAnimation.next;
    object.lastFrameDrawtime = currentTimestamp;
  }
}

function drawProjectile(object, startColumn, startRow, correctionX, correctionY) {
  ctx.drawImage(
    object.currentAnimation.frame,
    object.currentPosition.x - startColumn * tileSize - object.currentAnimation.frame.width / 2 + correctionX,
    object.currentPosition.y - startRow * tileSize - object.currentAnimation.frame.height / 2 + correctionY
  );
  if (currentTimestamp - object.lastFrameDrawtime >= object.currentTimeBetweenFrames) {
    object.currentAnimation = object.currentAnimation.next;
    object.lastFrameDrawtime = currentTimestamp;
  }
}

function drawPlayer() {
  let playerDrawPositionCorrectionX = 0;
  let playerDrawPositionCorrectionY = 0;
  //
  if (player.currentPosition.x < resolutionX / 2) {
    playerDrawPositionCorrectionX = resolutionX / 2 - player.currentPosition.x;
  }
  if (player.currentPosition.x > worldWidth * tileSize - resolutionX / 2) {
    playerDrawPositionCorrectionX = worldWidth * tileSize - player.currentPosition.x - resolutionX / 2;
  }
  if (player.currentPosition.y < resolutionY / 2) {
    playerDrawPositionCorrectionY = resolutionY / 2 - player.currentPosition.y;
  }
  if (player.currentPosition.y > worldHeight * tileSize - resolutionY / 2) {
    playerDrawPositionCorrectionY = worldHeight * tileSize - player.currentPosition.y - resolutionY / 2;
  }
  //

  if (player.previousState === player.currentState && player.previousDirection === player.currentDirection) {
    ctx.drawImage(player.currentAnimation.frame, resolutionX / 2 - player.currentAnimation.frame.width / 2 - playerDrawPositionCorrectionX, resolutionY / 2 - player.currentAnimation.frame.height / 2 - playerDrawPositionCorrectionY);
    //ctx.fillRect(resolutionX / 2 - 14 - playerDrawPositionCorrectionX, resolutionY / 2 - 14 - playerDrawPositionCorrectionY, 28, 28);
    if (currentTimestamp - player.lastFrameDrawtime >= player.currentTimeBetweenFrames) {
      player.currentAnimation = player.currentAnimation.next;
      player.lastFrameDrawtime = currentTimestamp;
    }
  } else {
    animationName = player.animationName + "_" + player.currentState + "_" + player.currentDirection;
    player.currentAnimation = animations[animationName].animationStart;
    ctx.drawImage(player.currentAnimation.frame, resolutionX / 2 - player.currentAnimation.frame.width / 2 - playerDrawPositionCorrectionX, resolutionY / 2 - player.currentAnimation.frame.height / 2 - playerDrawPositionCorrectionY);
    //ctx.fillRect(resolutionX / 2 - 14 - playerDrawPositionCorrectionX, resolutionY / 2 - 14 - playerDrawPositionCorrectionY, 28, 28);
    player.currentAnimation = player.currentAnimation.next;
    player.lastFrameDrawtime = currentTimestamp;
  }
}

function drawCharacter(object, startColumn, startRow, correctionX, correctionY) {
  if (object.previousState === object.currentState && object.previousDirection === object.currentDirection) {
    ctx.drawImage(
      object.currentAnimation.frame,
      object.currentPosition.x - startColumn * tileSize - object.currentAnimation.frame.width / 2 + correctionX,
      object.currentPosition.y - startRow * tileSize - object.currentAnimation.frame.height / 2 + correctionY
    );
    if (currentTimestamp - object.lastFrameDrawtime >= object.currentTimeBetweenFrames) {
      object.currentAnimation = object.currentAnimation.next;
      object.lastFrameDrawtime = currentTimestamp;
    }
  } else {
    animationName = object.animationName + "_" + object.currentState + "_" + object.currentDirection;
    object.currentAnimation = animations[animationName].animationStart;
    ctx.drawImage(
      object.currentAnimation.frame,
      object.currentPosition.x - startColumn * tileSize - object.currentAnimation.frame.width / 2 + correctionX,
      object.currentPosition.y - startRow * tileSize - object.currentAnimation.frame.height / 2 + correctionY
    );
    object.currentAnimation = object.currentAnimation.next;
    object.lastFrameDrawtime = currentTimestamp;
  }
}
