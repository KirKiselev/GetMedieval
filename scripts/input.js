function getPlayerActions() {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowUp":
        player.actions.up = true;
        break;
      case "ArrowDown":
        player.actions.down = true;
        break;
      case "ArrowLeft":
        player.actions.left = true;
        break;
      case "ArrowRight":
        player.actions.right = true;
        break;
      case "Control":
        player.actions.attack = true;
        break;
    }
  });

  document.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowUp":
        player.actions.up = false;
        break;
      case "ArrowDown":
        player.actions.down = false;
        break;
      case "ArrowLeft":
        player.actions.left = false;
        break;
      case "ArrowRight":
        player.actions.right = false;
        break;
      case "Control":
        player.actions.attack = false;
        break;
    }
  });
}
