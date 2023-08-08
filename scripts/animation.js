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
    animationName = character.type + "_" + character.currentState + "_" + character.currentDirection;
    character.currentAnimation = animations[animationName].animationStart;
    ctx.drawImage(character.currentAnimation.frame, x, y);
    character.currentAnimation = character.currentAnimation.next;
    character.lastFrameDrawtime = currentTimestamp;
  }
}

//
function drawFloor() {
  for (let row = 0; row < 16; row++) {
    for (let line = 0; line < 20; line++) {
      ctx.drawImage(animations.TILES_FLOOR.animationStart.frame, line * 32, row * 32);
    }
  }
}
//

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
