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
  constructor(type, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation = { IDLE: 1, MOVE: 1, ATTACK: 1 }, attackSpeed) {
    this.type = type;

    this.actions = { up: false, down: false, left: false, right: false, attack: false };

    this.currentDirection = "NORD";
    this.previousDirection = "NORD";
    this.position = position;
    this.size = size;
    this.speed = speed;
    this.diagSpeed = diagSpeed;
    this.linarMoving = 0;
    this.diagonalMoving = 0;
    //character have only one of three states in a time: "IDLE", "MOVE", "ATTACK"
    this.currentState = "IDLE";
    this.previousState = "IDLE";
    this.currentAnimation = animations[`${type + "_IDLE_NORD"}`].animationStart;
    this.lastFrameDrawtime = Date.now();
    this.currentTimeBetweenFrames = currentTimeBetweenFrames;
    this.animationSpeedMultiplier = { ...animation };
    this.nextAttackTime = Date.now();
    this.timeBetweenAttacks = attackSpeed;
  }
  attack() {
    if (currentTimestamp > this.nextAttackTime) {
      projectiles.push(new Projectile(this.type, this.currentDirection, this.previousDirection, { ...this.position }, 5, 0.5, 0.4, 80, { IDLE: 1, MOVE: 1, ATTACK: 1 }, 50));
      this.nextAttackTime = currentTimestamp + this.timeBetweenAttacks;
    }
  }
}

class Projectile {
  constructor(type, currentDirection, previousDirection, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation = { IDLE: 1, MOVE: 1, ATTACK: 1 }, damage) {
    this.type = type;

    this.currentDirection = currentDirection;
    this.previousDirection = previousDirection;
    this.position = position;
    this.size = size;
    this.speed = speed;
    this.diagSpeed = diagSpeed;
    this.linarMoving = 0;
    this.diagonalMoving = 0;

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
