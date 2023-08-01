function loadResourses() {
  console.log(Date.now() + "start");
  let image = new Image();
  image.onload = function () {
    let tmp = createImageBitmap(image, 0, 0, image.width, image.height);
    tmp.then(function (value) {
      let offScreenCanvas = new OffscreenCanvas(image.width, image.height);
      let ctxOffScreen = offScreenCanvas.getContext("2d");
      ctxOffScreen.drawImage(value, 0, 0);
      for (let elem of spritesheetsCoordinates) {
        createAnimationBuffer(offScreenCanvas, elem.start_x, elem.start_y, elem.width, elem.height, elem.frameWidth, elem.animationName);
      }
    });
  };
  image.src = "./spritesheets/spritesheet.png";
}

function createAnimationBuffer(sourse, x, y, width, height, frameWidth, animationName) {
  let framesArray = [];
  for (let i = 0; i < width; i += frameWidth) {
    framesArray.push(createImageBitmap(sourse, i, y, frameWidth, height));
  }

  Promise.all(framesArray)
    .then(function (values) {
      animations[animationName] = new FrameBuffer(values);
    })
    .then(console.log(Date.now()));
}
