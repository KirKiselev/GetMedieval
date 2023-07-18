function drawCharacter(character) {
  let animationName;
  //
  if (character.currentAnimation === null) {
    animationName = character.currentState + "_" + character.currentDirection;
    character.currentAnimation = animations[animationName].animationStart;
    character.currentTimeBetweenFrames = 80;
    character.lastFrameDrawtime = Date.now();
  }
  //

  let x = character.position.x - character.currentAnimation.frame.width / 2;
  let y = character.position.y - character.currentAnimation.frame.height / 2;

  if (character.previousState === character.currentState && character.previousDirection === character.currentDirection) {
    ctx.drawImage(character.currentAnimation.frame, x, y);
    if (currentTimestamp - character.lastFrameDrawtime >= character.currentTimeBetweenFrames) {
      character.currentAnimation = character.currentAnimation.next;
      character.lastFrameDrawtime = currentTimestamp;
    }
  } else {
    animationName = character.currentState + "_" + character.currentDirection;
    character.currentAnimation = animations[animationName].animationStart;
    ctx.drawImage(character.currentAnimation.frame, x, y);
    character.currentAnimation = character.currentAnimation.next;
    character.lastFrameDrawtime = currentTimestamp;
  }
}

function drawStaticObject(map) {
  let cell = 0;
  for (let row = 0; row < 8; row++) {
    for (let line = 0; line < 10; line++) {
      cell = 10 * row + line;
      switch (map[cell]) {
        case 0:
          ctx.drawImage(animations.TILES_FLOOR.animationStart.frame, line * 64, row * 64);
          break;
        case 1:
          ctx.drawImage(animations.TILES_WALLLOW.animationStart.frame, line * 64, row * 64);
          break;
        case 2:
          ctx.drawImage(animations.TILES_WALLHIGH.animationStart.frame, line * 64, row * 64);
          break;
      }
    }
  }
}
