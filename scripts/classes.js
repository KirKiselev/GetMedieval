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

class LinkedList {
  constructor() {
    this.length = 0;
    this.start = null;
    this.end = null;
  }
  add(object) {
    if (this.start) {
      this.end.next = new ListNode(this.end, null, object);
      this.end = this.end.next;
      this.length++;
    } else {
      this.start = new ListNode(null, null, object);
      this.end = this.start;
      this.length++;
    }
  }

  delete(object) {
    if (this.length <= 1) {
      object.prev = null;
      object.next = null;
      this.start = null;
      this.end = null;
      this.length = 0;
    } else {
      object.prev.next = object.next;
      object.next.prev = object.prev;
      object.next = null;
      object.prev = null;
      this.length--;
    }
  }
}

class ListNode {
  constructor(previousNode, nextNode, value) {
    this.prev = previousNode;
    this.next = nextNode;
    this.value = value;
  }
}

class Character {
  constructor(id, type, animationName, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation = { IDLE: 1, MOVE: 1, ATTACK: 1 }, timeBetweenAttacks, health) {
    this.id = id;
    this.type = type;
    this.animationName = animationName;
    this.tilesArrayInfo = [];
    this.tileXMin = 0;
    this.tileYMin = 0;
    this.tileXMax = 0;
    this.tileYMax = 0;

    this.actions = { up: false, down: false, left: false, right: false, attack: false };

    this.currentDirection = "NORD";
    this.previousDirection = "NORD";
    this.currentPosition = { ...position };
    this.nextPosition = { ...position };
    this.size = size;
    this.speed = speed;
    this.diagSpeed = diagSpeed;
    this.linarMoving = 0;
    this.diagonalMoving = 0;
    this.isMoveAvailable = true; // can character move in this iteration

    this.collisionModel = "circle";
    //character have only one of three states in a time: "IDLE", "MOVE", "ATTACK"
    this.currentState = "IDLE";
    this.previousState = "IDLE";
    this.currentAnimation = animations[`${animationName + "_IDLE_NORD"}`].animationStart;
    this.lastFrameDrawtime = Date.now();
    this.currentTimeBetweenFrames = currentTimeBetweenFrames;
    this.animationSpeedMultiplier = { ...animation };
    this.nextAttackTime = Date.now();
    this.timeBetweenAttacks = timeBetweenAttacks;

    this.health = health;
  }
  attack() {
    if (currentTimestamp >= this.nextAttackTime) {
      projectiles.push(new Projectile(getID(), this.type, this.animationName, this.currentDirection, this.previousDirection, { ...this.currentPosition }, 5, 0.5, 0.4, 80, { IDLE: 1, MOVE: 1, ATTACK: 1 }, 50));
      updateWorldTilesArray(projectiles[projectiles.length - 1]);
      this.nextAttackTime = currentTimestamp + this.timeBetweenAttacks;
    }
  }
}

class Projectile {
  constructor(id, type, animationName, currentDirection, previousDirection, position, size, speed, diagSpeed, currentTimeBetweenFrames, animation = { IDLE: 1, MOVE: 1, ATTACK: 1 }, damage) {
    this.id = id;
    this.type = type + "_PROJECTILE";
    this.animationName = animationName;
    this.tilesArrayInfo = [];
    this.tileXMin = 0;
    this.tileYMin = 0;
    this.tileXMax = 0;
    this.tileYMax = 0;

    this.currentDirection = currentDirection;
    this.previousDirection = previousDirection;
    this.currentPosition = { ...position };
    this.nextPosition = { ...position };
    this.size = size;

    this.speed = speed;
    this.diagSpeed = diagSpeed;
    this.linarMoving = 0;
    this.diagonalMoving = 0;
    this.isMoveAvailable = true;

    this.collisionModel = "circle";

    this.currentState = "MOVE";
    this.previousState = "MOVE";
    this.currentAnimation = animations[`${animationName + "_PROJECTILE_" + currentDirection}`].animationStart;
    this.lastFrameDrawtime = Date.now();
    this.currentTimeBetweenFrames = currentTimeBetweenFrames;
    this.animationSpeedMultiplier = { ...animation };
    this.nextAttackTime = Date.now();
    this.damage = damage;
  }
  doDamage(object) {
    object.health -= this.damage;
  }
}

class WorldObject {
  constructor(id, type, subtype, animationName, position, halfSizeX, halfSizeY, currentTimeBetweenFrames) {
    this.id = id;
    this.type = type;
    this.subtype = subtype;
    this.animationName = animationName;
    this.tilesArrayInfo = [];
    this.tileXMin = 0;
    this.tileYMin = 0;
    this.tileXMax = 0;
    this.tileYMax = 0;

    this.currentPosition = { ...position };
    this.sizeX = halfSizeX;
    this.sizeY = halfSizeY;

    this.collisionModel = "square";

    this.currentAnimation = animations[animationName].animationStart;
    this.lastFrameDrawtime = Date.now();
    this.currentTimeBetweenFrames = currentTimeBetweenFrames;
  }
}
