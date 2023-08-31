/*
  for (let characterID in activeCharacters) {
    currentNPC = activeCharacters[characterID];

    if (isAttackDistanceReach(currentNPC, player)) {
      
      if(isTargetOnFiringLine(currentNPC, player)) {
        currentNPC.path = undefined;
        attackTarget();
      }
      else {
        attackTarget();
      }
      
    } else {currentNPC, player
      if(currentNPC.path === undefined;) {
        findPath(currentNPC, player); 
      }
      else{
        if(!isPathActual(currentNPC, player)){
          findPath(currentNPC, player);
        } 
      }      
      moveToTile(currentNPC, currentNPC.path[0])
    }
    //draw methods
    setCharacterDirection(currentNPC); 
    setCharacterState(currentNPC); 
    moveCharacter(currentNPC, timeDifference);
    setInactive(currentNPC); 
  }*/

//NPC Scripts
//object_1 - attacker, object_2 - target
function isAttackDistanceReach(object_1, object_2) {
  let xDistance = Math.abs(object_1.currentPosition.x - object_2.currentPosition.x);
  let yDistance = Math.abs(object_1.currentPosition.y - object_2.currentPosition.y);

  if (Math.pow(xDistance, 2) + Math.pow(yDistance, 2) <= Math.pow(object_1.attackDistance + object_2.size, 2)) {
    return true;
  }
  return false;
}

function attackTarget() {
  console.log("Attack");
}

function moveToTarget() {
  return;
}

//object_1 - walker, object_2 - destination
function findPath(object_1, object_2) {
  let startRow = Math.floor(object_1.currentPosition.y / tileSize);
  let startColumn = Math.floor(object_1.currentPosition.x / tileSize);
  let endRow = Math.floor(object_2.currentPosition.y / tileSize);
  let endColumn = Math.floor(object_2.currentPosition.x / tileSize);
  let startTile = startRow * worldWidth + startColumn;
  let endTile = endRow * worldWidth + endColumn;
  let markedTiles = new Set();
  let tilesToCheck = [[startTile, null]];

  markedTiles.add(startTile);
  for (let i = 0; i < tilesToCheck.length; i++) {
    if (tilesToCheck[i][0] !== endTile) {
      addTilesAround(tilesToCheck[i][0], i);
    } else {
      object_1.path = getPath(tilesToCheck, i);
    }
  }
  //it works, if we have border of static objects around a map
  function addTilesAround(tile, index) {
    let offset = [tile - worldWidth, tile - 1, tile + 1, tile + worldWidth];
    for (let elem of offset) {
      if (!markedTiles.has(elem)) {
        if (!hasStaticObjects(elem)) {
          if (!markedTiles.has(elem)) {
            tilesToCheck.push([elem, index]);
          }
          markedTiles.add(elem);
        }
      }
    }
  }

  function hasStaticObjects(tile) {
    let result = false;
    for (let objectName in worldTilesArray[tile]) {
      if (worldTilesArray[tile][objectName].type === "STATIC_OBJECT") {
        result = true;
      }
    }
    return result;
  }

  function getPath(arr, index) {
    let result = [];
    for (let i = index; i != null; ) {
      result.push(arr[i][0]);
      i = arr[i][1];
    }

    return result.reverse();
  }
}

function moveToTile(character, tileNumber) {
  let tileCenterX = (tileNumber % worldWidth) * tileSize + tileSize / 2;
  let tileCenterY = Math.floor(tileNumber / worldWidth) * tileSize + tileSize / 2;

  if (character.currentPosition.x - tileCenterX < -1) {
    character.actions.right = true;
    character.actions.left = false;
  }

  if (character.currentPosition.x - tileCenterX > 1) {
    character.actions.left = true;
    character.actions.right = false;
  }

  if (character.currentPosition.y - tileCenterY < -1) {
    character.actions.down = true;
    character.actions.up = false;
  }

  if (character.currentPosition.y - tileCenterY > 1) {
    character.actions.up = true;
    character.actions.down = false;
  }

  if (Math.pow(character.currentPosition.x - tileCenterX, 2) + Math.pow(character.currentPosition.y - tileCenterY, 2) < 1) {
    character.actions.right = false;
    character.actions.left = false;
    character.actions.down = false;
    character.actions.up = false;

    character.path.shift();
  }
}
//
function isTargetOnFiringLine(attacker, target) {
  if (
    //for Y axis
    Math.abs(attacker.currentPosition.x - target.currentPosition.x) < target.size ||
    //For X axis
    Math.abs(attacker.currentPosition.y - target.currentPosition.y) < target.size ||
    //For Diagonal axis
    checkDiagonalAxis(attacker, target)
  ) {
    return true;
  }
  return false;

  function checkDiagonalAxis(attacker, target) {
    //check diagonal axis from -x-y to +x+y
    let offsetA = attacker.currentPosition.x - attacker.currentPosition.y;
    let offsetT = target.currentPosition.x - target.currentPosition.y;
    let delta = Math.abs(offsetA - offsetT);
    if (Math.pow(delta, 2) < Math.pow(target.size, 2) * 2) {
      return true;
    }
    //check diagonal axis from +x-y to -x+y
    offsetA = attacker.currentPosition.x + attacker.currentPosition.y;
    offsetT = target.currentPosition.x + target.currentPosition.y;
    delta = Math.abs(offsetA - offsetT);
    if (Math.pow(delta, 2) < Math.pow(target.size, 2) * 2) {
      return true;
    }

    return false;
  }
}

function isPathActual(character, target) {
  let endRow = Math.floor(target.currentPosition.y / tileSize);
  let endColumn = Math.floor(target.currentPosition.x / tileSize);
  let endTile = endRow * worldWidth + endColumn;

  if (character.path[character.path.length - 1] === endTile) {
    return true;
  }
  return false;
}
