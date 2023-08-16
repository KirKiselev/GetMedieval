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

let visibleAreaWidth = 10;
let visibleAreaHeight = 8;
let correctionX = 0;
let correctionY = 0;

//visible area have size 10 x 8 tiles
function drawVisibleArea(character) {
  let cameraPositionX = 0; //topleft point
  let cameraPositionY = 0; //of visible area
  if (player.currentPosition.x > 160) {
    cameraPositionX = player.currentPosition.x - 160;
  }
  if (player.currentPosition.x > worldWidth * tileSize - 160) {
    cameraPositionX = worldWidth * tileSize - 320;
  }
  if (player.currentPosition.y > 120) {
    cameraPositionY = player.currentPosition.y - 120;
  }
  if (player.currentPosition.y > worldHeight * tileSize - 156) {
    cameraPositionY = worldHeight * tileSize - 272;
  }

  let startRow = Math.floor(cameraPositionY / tileSize);
  let startColumn = Math.floor(cameraPositionX / tileSize);

  correctionX = startColumn * tileSize - cameraPositionX;
  correctionY = startRow * tileSize - cameraPositionY;
  let cell;

  for (let row = 0; row <= visibleAreaHeight; row++) {
    for (let column = 0; column <= visibleAreaWidth; column++) {
      cell = (row + startRow) * worldWidth + (column + startColumn);
      ctx.drawImage(worldStaticObjects[cell].currentAnimation.frame, column * tileSize + correctionX, row * tileSize + correctionY);
    }
  }

  //draw player

  let playerDrawPositionCorrectionX = 0;
  let playerDrawPositionCorrectionY = 0;
  if (player.currentPosition.x < 160) {
    playerDrawPositionCorrectionX = 160 - player.currentPosition.x;
  }
  if (player.currentPosition.x > worldWidth * tileSize - 160) {
    playerDrawPositionCorrectionX = player.currentPosition.x - worldWidth * tileSize + 160;
  }
  if (player.currentPosition.y < 120) {
    playerDrawPositionCorrectionY = 120 - player.currentPosition.y;
  }
  if (player.currentPosition.y > worldWidth * tileSize - 120) {
    playerDrawPositionCorrectionY = player.currentPosition.y - worldWidth * tileSize + 120;
  }

  if (player.previousState === player.currentState && player.previousDirection === player.currentDirection) {
    ctx.drawImage(player.currentAnimation.frame, 160 - player.currentAnimation.frame.width / 2 - playerDrawPositionCorrectionX, 120 - player.currentAnimation.frame.height / 2 - playerDrawPositionCorrectionY);
    if (currentTimestamp - player.lastFrameDrawtime >= player.currentTimeBetweenFrames) {
      player.currentAnimation = player.currentAnimation.next;
      player.lastFrameDrawtime = currentTimestamp;
    }
  } else {
    animationName = player.animationName + "_" + player.currentState + "_" + player.currentDirection;
    player.currentAnimation = animations[animationName].animationStart;
    ctx.drawImage(player.currentAnimation.frame, 160 - player.currentAnimation.frame.width / 2 - playerDrawPositionCorrectionX, 120 - player.currentAnimation.frame.height / 2 - playerDrawPositionCorrectionY);
    player.currentAnimation = player.currentAnimation.next;
    player.lastFrameDrawtime = currentTimestamp;
  }
}
