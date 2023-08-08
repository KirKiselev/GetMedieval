class FrameBuffer {
  constructor(arr) {
    this.animationStart = new Frame(arr[0]);
    this.framesCount = arr.length;
    let current = this.animationStart;
    for (let i = 1; i < arr.length; i++) {
      current.next = new Frame(arr[i]);
      current = current.next;
    }
    current.next = this.animationStart;
  }
}

class Frame {
  constructor(value) {
    this.frame = value;
    this.next = null;
  }
}

class Character {
  constructor(id, type, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation = { IDLE: 1, MOVE: 1, ATTACK: 1 }, timeBetweenAttacks) {
    this.id = id;
    this.type = type;

    this.actions = { up: false, down: false, left: false, right: false, attack: false };

    this.currentDirection = "NORD";
    this.previousDirection = "NORD";
    this.currentPosition = { ...position };
    this.nextPosition = { ...position };
    this.size = size;
    this.xMin = position.x - size;
    this.xMax = position.x + size;
    this.yMin = position.y - size;
    this.yMax = position.y + size;
    this.speed = speed;
    this.diagSpeed = diagSpeed;
    this.linarMoving = 0;
    this.diagonalMoving = 0;

    this.collisionModel = "circle";
    //character have only one of three states in a time: "IDLE", "MOVE", "ATTACK"
    this.currentState = "IDLE";
    this.previousState = "IDLE";
    this.currentAnimation = animations[`${type + "_IDLE_NORD"}`].animationStart;
    this.lastFrameDrawtime = Date.now();
    this.currentTimeBetweenFrames = currentTimeBetweenFrames;
    this.animationSpeedMultiplier = { ...animation };
    this.nextAttackTime = Date.now();
    this.timeBetweenAttacks = timeBetweenAttacks;
  }
  attack() {
    if (currentTimestamp >= this.nextAttackTime) {
      projectiles.push(new Projectile(getID(), this.type, this.currentDirection, this.previousDirection, { ...this.currentPosition }, 5, 0.5, 0.4, 80, { IDLE: 1, MOVE: 1, ATTACK: 1 }, 50));
      updateWorldTilesArray(projectiles[projectiles.length - 1]);
      this.nextAttackTime = currentTimestamp + this.timeBetweenAttacks;
    }
  }
}

class Projectile {
  constructor(id, type, currentDirection, previousDirection, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation = { IDLE: 1, MOVE: 1, ATTACK: 1 }, damage) {
    this.id = id;
    this.type = type;

    this.currentDirection = currentDirection;
    this.previousDirection = previousDirection;
    this.currentPosition = { ...position };
    this.nextPosition = { ...position };
    this.size = size;
    this.xMin = position.x - size;
    this.xMax = position.x + size;
    this.yMin = position.y - size;
    this.yMax = position.y + size;
    this.speed = speed;
    this.diagSpeed = diagSpeed;
    this.linarMoving = 0;
    this.diagonalMoving = 0;

    this.collisionModel = "circle";

    this.currentState = "MOVE";
    this.previousState = "MOVE";
    this.currentAnimation = animations[`${type + "_PROJECTILE_" + currentDirection}`].animationStart;
    this.lastFrameDrawtime = Date.now();
    this.currentTimeBetweenFrames = currentTimeBetweenFrames;
    this.animationSpeedMultiplier = { ...animation };
    this.nextAttackTime = Date.now();
    this.damage = this.damage;
  }
}

class WorldObject {
  constructor(id, type, position, halfSizeX, halfSizeY, currentTimeBetweenFrames) {
    this.id = id;
    this.type = type;

    this.currentPosition = { ...position };
    this.sizeX = halfSizeX;
    this.sizeY = halfSizeY;
    this.xMin = position.x - halfSizeX;
    this.xMax = position.x + halfSizeX;
    this.yMin = position.y - halfSizeY;
    this.yMax = position.y + halfSizeY;

    this.collisionModel = "square";

    this.currentAnimation = animations[type].animationStart;
    this.lastFrameDrawtime = Date.now();
    this.currentTimeBetweenFrames = currentTimeBetweenFrames;
  }
}
