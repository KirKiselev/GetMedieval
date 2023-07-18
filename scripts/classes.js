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
