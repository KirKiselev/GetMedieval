let spritesheetsCoordinates = {
  ARCHER: [
    { start_x: 0, start_y: 0, width: 352, height: 45, frameWidth: 44, animationName: "ARCHER_IDLE_NORD" },
    { start_x: 0, start_y: 45, width: 352, height: 45, frameWidth: 44, animationName: "ARCHER_IDLE_EAST" },
    { start_x: 0, start_y: 90, width: 352, height: 51, frameWidth: 44, animationName: "ARCHER_IDLE_SOUTH" },
    { start_x: 0, start_y: 141, width: 416, height: 42, frameWidth: 52, animationName: "ARCHER_IDLE_WEST" },
    { start_x: 0, start_y: 183, width: 384, height: 53, frameWidth: 48, animationName: "ARCHER_IDLE_NORDEAST" },
    { start_x: 0, start_y: 236, width: 448, height: 49, frameWidth: 56, animationName: "ARCHER_IDLE_SOUTHEAST" },
    { start_x: 0, start_y: 285, width: 416, height: 60, frameWidth: 52, animationName: "ARCHER_IDLE_SOUTHWEST" },
    { start_x: 0, start_y: 345, width: 480, height: 40, frameWidth: 60, animationName: "ARCHER_IDLE_NORDWEST" },
    { start_x: 0, start_y: 385, width: 352, height: 47, frameWidth: 44, animationName: "ARCHER_MOVE_NORD" },
    { start_x: 0, start_y: 432, width: 384, height: 45, frameWidth: 48, animationName: "ARCHER_MOVE_EAST" },
    { start_x: 0, start_y: 477, width: 352, height: 53, frameWidth: 44, animationName: "ARCHER_MOVE_SOUTH" },
    { start_x: 0, start_y: 530, width: 416, height: 48, frameWidth: 52, animationName: "ARCHER_MOVE_WEST" },
    { start_x: 0, start_y: 578, width: 384, height: 55, frameWidth: 48, animationName: "ARCHER_MOVE_NORDEAST" },
    { start_x: 0, start_y: 633, width: 448, height: 49, frameWidth: 56, animationName: "ARCHER_MOVE_SOUTHEAST" },
    { start_x: 0, start_y: 682, width: 416, height: 61, frameWidth: 52, animationName: "ARCHER_MOVE_SOUTHWEST" },
    { start_x: 0, start_y: 743, width: 480, height: 44, frameWidth: 60, animationName: "ARCHER_MOVE_NORDWEST" },
    { start_x: 0, start_y: 787, width: 240, height: 68, frameWidth: 48, animationName: "ARCHER_ATTACK_NORD" },
    { start_x: 0, start_y: 855, width: 340, height: 41, frameWidth: 68, animationName: "ARCHER_ATTACK_EAST" },
    { start_x: 0, start_y: 896, width: 240, height: 60, frameWidth: 48, animationName: "ARCHER_ATTACK_SOUTH" },
    { start_x: 0, start_y: 956, width: 340, height: 52, frameWidth: 68, animationName: "ARCHER_ATTACK_WEST" },
    { start_x: 0, start_y: 1008, width: 300, height: 57, frameWidth: 60, animationName: "ARCHER_ATTACK_NORDEAST" },
    { start_x: 0, start_y: 1065, width: 280, height: 54, frameWidth: 56, animationName: "ARCHER_ATTACK_SOUTHEAST" },
    { start_x: 0, start_y: 1119, width: 320, height: 58, frameWidth: 64, animationName: "ARCHER_ATTACK_SOUTHWEST" },
    { start_x: 0, start_y: 1177, width: 280, height: 62, frameWidth: 56, animationName: "ARCHER_ATTACK_NORDWEST" },
  ],
  ORC: [
    { start_x: 0, start_y: 0, width: 208, height: 64, frameWidth: 52, animationName: "ORC_IDLE_NORD" },
    { start_x: 0, start_y: 64, width: 256, height: 47, frameWidth: 64, animationName: "ORC_IDLE_EAST" },
    { start_x: 0, start_y: 111, width: 176, height: 42, frameWidth: 44, animationName: "ORC_IDLE_SOUTH" },
    { start_x: 0, start_y: 153, width: 256, height: 42, frameWidth: 64, animationName: "ORC_IDLE_WEST" },
    { start_x: 0, start_y: 195, width: 256, height: 52, frameWidth: 64, animationName: "ORC_IDLE_NORDEAST" },
    { start_x: 0, start_y: 247, width: 208, height: 48, frameWidth: 52, animationName: "ORC_IDLE_SOUTHEAST" },
    { start_x: 0, start_y: 295, width: 240, height: 42, frameWidth: 60, animationName: "ORC_IDLE_SOUTHWEST" },
    { start_x: 0, start_y: 337, width: 224, height: 61, frameWidth: 56, animationName: "ORC_IDLE_NORDWEST" },
    { start_x: 0, start_y: 398, width: 336, height: 71, frameWidth: 84, animationName: "ORC_ATTACK_NORD" },
    { start_x: 0, start_y: 469, width: 320, height: 48, frameWidth: 80, animationName: "ORC_ATTACK_EAST" },
    { start_x: 0, start_y: 517, width: 272, height: 60, frameWidth: 68, animationName: "ORC_ATTACK_SOUTH" },
    { start_x: 0, start_y: 577, width: 272, height: 74, frameWidth: 68, animationName: "ORC_ATTACK_WEST" },
    { start_x: 0, start_y: 651, width: 304, height: 62, frameWidth: 76, animationName: "ORC_ATTACK_NORDEAST" },
    { start_x: 0, start_y: 713, width: 240, height: 51, frameWidth: 60, animationName: "ORC_ATTACK_SOUTHEAST" },
    { start_x: 0, start_y: 764, width: 272, height: 56, frameWidth: 68, animationName: "ORC_ATTACK_SOUTHWEST" },
    { start_x: 0, start_y: 820, width: 272, height: 69, frameWidth: 68, animationName: "ORC_ATTACK_NORDWEST" },
    { start_x: 0, start_y: 889, width: 540, height: 64, frameWidth: 60, animationName: "ORC_MOVE_NORD" },
    { start_x: 0, start_y: 953, width: 648, height: 44, frameWidth: 72, animationName: "ORC_MOVE_EAST" },
    { start_x: 0, start_y: 997, width: 468, height: 50, frameWidth: 52, animationName: "ORC_MOVE_SOUTH" },
    { start_x: 0, start_y: 1047, width: 648, height: 52, frameWidth: 72, animationName: "ORC_MOVE_WEST" },
    { start_x: 0, start_y: 1099, width: 576, height: 58, frameWidth: 64, animationName: "ORC_MOVE_NORDEAST" },
    { start_x: 0, start_y: 1157, width: 540, height: 59, frameWidth: 60, animationName: "ORC_MOVE_SOUTHEAST" },
    { start_x: 0, start_y: 1216, width: 648, height: 54, frameWidth: 72, animationName: "ORC_MOVE_SOUTHWEST" },
    { start_x: 0, start_y: 1270, width: 612, height: 59, frameWidth: 68, animationName: "ORC_MOVE_NORDWEST" },
  ],
  SORCERESS: [
    { start_x: 0, start_y: 0, width: 352, height: 45, frameWidth: 44, animationName: "ARCHER_IDLE_NORD" },
    { start_x: 0, start_y: 45, width: 224, height: 50, frameWidth: 28, animationName: "ARCHER_IDLE_EAST" },
    { start_x: 0, start_y: 95, width: 352, height: 43, frameWidth: 44, animationName: "ARCHER_IDLE_SOUTH" },
    { start_x: 0, start_y: 138, width: 224, height: 56, frameWidth: 28, animationName: "ARCHER_IDLE_WEST" },
    { start_x: 0, start_y: 194, width: 352, height: 49, frameWidth: 44, animationName: "ARCHER_IDLE_NORDEAST" },
    { start_x: 0, start_y: 243, width: 320, height: 45, frameWidth: 40, animationName: "ARCHER_IDLE_SOUTHEAST" },
    { start_x: 0, start_y: 288, width: 320, height: 44, frameWidth: 40, animationName: "ARCHER_IDLE_SOUTHWEST" },
    { start_x: 0, start_y: 332, width: 288, height: 54, frameWidth: 36, animationName: "ARCHER_IDLE_NORDWEST" },
    { start_x: 0, start_y: 386, width: 352, height: 51, frameWidth: 44, animationName: "ARCHER_MOVE_NORD" },
    { start_x: 0, start_y: 437, width: 288, height: 47, frameWidth: 36, animationName: "ARCHER_MOVE_EAST" },
    { start_x: 0, start_y: 484, width: 320, height: 47, frameWidth: 40, animationName: "ARCHER_MOVE_SOUTH" },
    { start_x: 0, start_y: 531, width: 256, height: 55, frameWidth: 32, animationName: "ARCHER_MOVE_WEST" },
    { start_x: 0, start_y: 586, width: 384, height: 53, frameWidth: 48, animationName: "ARCHER_MOVE_NORDEAST" },
    { start_x: 0, start_y: 639, width: 320, height: 44, frameWidth: 40, animationName: "ARCHER_MOVE_SOUTHEAST" },
    { start_x: 0, start_y: 683, width: 352, height: 44, frameWidth: 44, animationName: "ARCHER_MOVE_SOUTHWEST" },
    { start_x: 0, start_y: 727, width: 320, height: 58, frameWidth: 40, animationName: "ARCHER_MOVE_NORDWEST" },
    { start_x: 0, start_y: 785, width: 160, height: 61, frameWidth: 40, animationName: "ARCHER_ATTACK_NORD" },
    { start_x: 0, start_y: 846, width: 256, height: 43, frameWidth: 64, animationName: "ARCHER_ATTACK_EAST" },
    { start_x: 0, start_y: 889, width: 160, height: 59, frameWidth: 40, animationName: "ARCHER_ATTACK_SOUTH" },
    { start_x: 0, start_y: 948, width: 256, height: 47, frameWidth: 64, animationName: "ARCHER_ATTACK_WEST" },
    { start_x: 0, start_y: 995, width: 224, height: 52, frameWidth: 56, animationName: "ARCHER_ATTACK_NORDEAST" },
    { start_x: 0, start_y: 1047, width: 224, height: 54, frameWidth: 56, animationName: "ARCHER_ATTACK_SOUTHEAST" },
    { start_x: 0, start_y: 1101, width: 240, height: 48, frameWidth: 60, animationName: "ARCHER_ATTACK_SOUTHWEST" },
    { start_x: 0, start_y: 1149, width: 208, height: 57, frameWidth: 52, animationName: "ARCHER_ATTACK_NORDWEST" },
  ],
  TILES: [
    { start_x: 0, start_y: 0, width: 32, height: 32, frameWidth: 32, animationName: "TILES_WALLLOW" },
    { start_x: 0, start_y: 32, width: 32, height: 32, frameWidth: 32, animationName: "TILES_WALLHIGH" },
    { start_x: 0, start_y: 64, width: 32, height: 32, frameWidth: 32, animationName: "TILES_FLOOR" },
  ],
  SPIDER: [
    { start_x: 0, start_y: 0, width: 40, height: 41, frameWidth: 40, animationName: "SPIDER_IDLE_NORD" },
    { start_x: 0, start_y: 41, width: 44, height: 36, frameWidth: 44, animationName: "SPIDER_IDLE_EAST" },
    { start_x: 0, start_y: 77, width: 40, height: 43, frameWidth: 40, animationName: "SPIDER_IDLE_SOUTH" },
    { start_x: 0, start_y: 120, width: 48, height: 36, frameWidth: 48, animationName: "SPIDER_IDLE_WEST" },
    { start_x: 0, start_y: 156, width: 44, height: 40, frameWidth: 44, animationName: "SPIDER_IDLE_NORDEAST" },
    { start_x: 0, start_y: 196, width: 44, height: 41, frameWidth: 44, animationName: "SPIDER_IDLE_SOUTHEAST" },
    { start_x: 0, start_y: 237, width: 44, height: 45, frameWidth: 44, animationName: "SPIDER_IDLE_SOUTHWEST" },
    { start_x: 0, start_y: 282, width: 44, height: 40, frameWidth: 44, animationName: "SPIDER_IDLE_NORDWEST" },
    { start_x: 0, start_y: 322, width: 320, height: 41, frameWidth: 40, animationName: "SPIDER_MOVE_NORD" },
    { start_x: 0, start_y: 363, width: 352, height: 37, frameWidth: 44, animationName: "SPIDER_MOVE_EAST" },
    { start_x: 0, start_y: 400, width: 320, height: 43, frameWidth: 40, animationName: "SPIDER_MOVE_SOUTH" },
    { start_x: 0, start_y: 443, width: 384, height: 37, frameWidth: 48, animationName: "SPIDER_MOVE_WEST" },
    { start_x: 0, start_y: 480, width: 352, height: 40, frameWidth: 44, animationName: "SPIDER_MOVE_NORDEAST" },
    { start_x: 0, start_y: 520, width: 352, height: 42, frameWidth: 44, animationName: "SPIDER_MOVE_SOUTHEAST" },
    { start_x: 0, start_y: 562, width: 352, height: 45, frameWidth: 44, animationName: "SPIDER_MOVE_SOUTHWEST" },
    { start_x: 0, start_y: 607, width: 352, height: 40, frameWidth: 44, animationName: "SPIDER_MOVE_NORDWEST" },
    { start_x: 0, start_y: 647, width: 160, height: 43, frameWidth: 40, animationName: "SPIDER_ATTACK_NORD" },
    { start_x: 0, start_y: 690, width: 192, height: 41, frameWidth: 48, animationName: "SPIDER_ATTACK_EAST" },
    { start_x: 0, start_y: 731, width: 176, height: 38, frameWidth: 44, animationName: "SPIDER_ATTACK_SOUTH" },
    { start_x: 0, start_y: 769, width: 160, height: 42, frameWidth: 40, animationName: "SPIDER_ATTACK_WEST" },
    { start_x: 0, start_y: 811, width: 192, height: 47, frameWidth: 48, animationName: "SPIDER_ATTACK_NORDEAST" },
    { start_x: 0, start_y: 858, width: 192, height: 43, frameWidth: 48, animationName: "SPIDER_ATTACK_SOUTHEAST" },
    { start_x: 0, start_y: 901, width: 192, height: 41, frameWidth: 48, animationName: "SPIDER_ATTACK_SOUTHWEST" },
    { start_x: 0, start_y: 942, width: 176, height: 47, frameWidth: 44, animationName: "SPIDER_ATTACK_NORDWEST" },
  ],
};