(function botController() {
  function play() {
    const playerSpeed = 0.5 * difficulty;

    if (!player || !enemy) return;

    // console.log(player);
    // console.log(animTicks);
    console.log(enemy);
    console.log(playerSpeed);

    // reverseDirection();
  }

  /**
   * Reverse player movement direction.
   * @returns void
   */
  function reverseDirection() {
    if (!player) {
      return;
    }
    console.log("Changed direction");
    player.vx *= -1;
  }

  // make a move every 1s
  setInterval(play, 1000);
})();
