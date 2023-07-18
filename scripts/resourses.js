function loadResourses() {
  images.IDLE_NORD.src = "./pictures/archer/stay/nord/stay_nord.png";
  images.IDLE_EAST.src = "./pictures/archer/stay/east/stay_east.png";
  images.IDLE_SOUTH.src = "./pictures/archer/stay/south/stay_south.png";
  images.IDLE_WEST.src = "./pictures/archer/stay/west/stay_west.png";
  images.IDLE_NORDWEST.src = "./pictures/archer/stay/nordwest/stay_nordwest.png";
  images.IDLE_NORDEAST.src = "./pictures/archer/stay/nordeast/stay_nordeast.png";
  images.IDLE_SOUTHEAST.src = "./pictures/archer/stay/southeast/stay_southeast.png";
  images.IDLE_SOUTHWEST.src = "./pictures/archer/stay/southwest/stay_southwest.png";
  images.MOVE_NORD.src = "./pictures/archer/move/nord/move_nord.png";
  images.MOVE_EAST.src = "./pictures/archer/move/east/move_east.png";
  images.MOVE_SOUTH.src = "./pictures/archer/move/south/move_south.png";
  images.MOVE_WEST.src = "./pictures/archer/move/west/move_west.png";
  images.MOVE_NORDWEST.src = "./pictures/archer/move/nordwest/move_nordwest.png";
  images.MOVE_NORDEAST.src = "./pictures/archer/move/nordeast/move_nordeast.png";
  images.MOVE_SOUTHEAST.src = "./pictures/archer/move/southeast/move_southeast.png";
  images.MOVE_SOUTHWEST.src = "./pictures/archer/move/southwest/move_southwest.png";
  images.ATTACK_NORD.src = "./pictures/archer/attack/nord/attack_nord.png";
  images.ATTACK_EAST.src = "./pictures/archer/attack/east/attack_east.png";
  images.ATTACK_SOUTH.src = "./pictures/archer/attack/south/attack_south.png";
  images.ATTACK_WEST.src = "./pictures/archer/attack/west/attack_west.png";
  images.ATTACK_NORDWEST.src = "./pictures/archer/attack/nordwest/attack_nordwest.png";
  images.ATTACK_NORDEAST.src = "./pictures/archer/attack/nordeast/attack_nordeast.png";
  images.ATTACK_SOUTHEAST.src = "./pictures/archer/attack/southeast/attack_southeast.png";
  images.ATTACK_SOUTHWEST.src = "./pictures/archer/attack/southwest/attack_southwest.png";
  images.TILES_WALLLOW.src = "./pictures/tiles/wall_low.png";
  images.TILES_WALLHIGH.src = "./pictures/tiles/wall_high.png";
  images.TILES_FLOOR.src = "./pictures/tiles/floor.png";
}

function createBitmapArray(img, propName) {
  let promises = [];
  let divider = 0;
  //
  if (img == images.ATTACK_NORD || img == images.ATTACK_EAST || img == images.ATTACK_SOUTH || img == images.ATTACK_WEST || img == images.ATTACK_NORDEAST || img == images.ATTACK_NORDWEST || img == images.ATTACK_SOUTHEAST || img == images.ATTACK_SOUTHWEST) {
    divider = 5;
  } else {
    divider = 8;
  }
  if (img == images.TILES_WALLLOW || img == images.TILES_WALLHIGH || img == images.TILES_FLOOR) {
    divider = 1;
  }
  //
  let width = Number.parseInt(img.width / divider);

  for (let i = 0; i < divider; i++) {
    promises.push(createImageBitmap(img, width * i, 0, width, img.height));
  }

  Promise.all(promises).then(function (values) {
    animations[propName] = new FrameBuffer(values);
  });
}

function createAnimationBuffers() {
  for (let elem in images) {
    createBitmapArray(images[elem], elem);
  }
}
