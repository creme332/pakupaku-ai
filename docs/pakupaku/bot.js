/**
 * An interface for your bot algorithm to communicate with the game.
 * It ensures that you are not inadvertently modifying the game.
 * Do not modify this code unless you know what you are doing.
 * @returns
 */
function interface() {
  let previousPlayerPosition;

  /**
   * Saves current position of player. This function is
   * used to determine if game is ongoing.
   *
   * NOTE: Do not call this function inside of your strategy.
   */
  function savePlayerPosition() {
    previousPlayerPosition = getPlayerPosition();
  }

  /**
   * Returns velocity of enemy. Negative velocity means that enemy
   * is moving left and positive velocity means that enemy is moving right.
   * @returns
   */
  function getEnemyVelocity() {
    if (!enemy) return;
    const evx =
      enemy.eyeVx !== 0
        ? enemy.eyeVx
        : (player.x > enemy.x ? 1 : -1) * (powerTicks > 0 ? -1 : 1);
    const enemyVelocity =
      evx *
      (powerTicks > 0 ? 0.25 : enemy.eyeVx !== 0 ? 0.75 : 0.55) *
      difficulty;

    return enemyVelocity;
  }

  /**
   * Check if game is ongoing. Game is said to be ongoing if
   * player is moving.
   * @returns
   */
  function gameOngoing() {
    if (!player || !enemy) return false;

    const currentPlayerPosition = Math.floor(getPlayerPosition());
    previousPlayerPosition = Math.floor(previousPlayerPosition);

    // check if player is moving
    return currentPlayerPosition !== previousPlayerPosition;
  }

  /**
   * Returns velocity of player. Negative velocity means that player
   * is moving left and positive velocity means that player is moving right.
   * @returns float
   */
  function getPlayerVelocity() {
    if (!player) return;
    return 0.5 * difficulty * getPlayerDirection();
  }

  /**
   * Position of player on x-axis
   * @returns A value 0-100
   */
  function getPlayerPosition() {
    return player?.x;
  }

  /**
   * Position of player on x-axis
   * @returns A value 0-100
   */
  function getEnemyPosition() {
    return enemy?.x;
  }

  /**
   * Movement direction of player
   * @returns 1 if player is moving right and -1 otherwise
   */
  function getPlayerDirection() {
    if (!player) return;
    return player.vx;
  }

  /**
   * Movement direction of enemy
   * @returns 1 if enemy is moving right and -1 otherwise
   */
  function getEnemyDirection() {
    return getEnemyVelocity() > 0 ? 1 : -1;
  }

  /**
   * Reverse player movement direction.
   * @returns void
   */
  function reversePlayerDirection() {
    if (!player) return;
    player.vx *= -1;
  }

  /**
   * Get player attributes
   * @returns
   */
  function getPlayer() {
    return {
      position: getPlayerPosition(),
      velocity: getPlayerVelocity(),
    };
  }

  /**
   *
   * @returns An array of objects about dots. Each object
   * contains dot position and whether or not dot is a Power.
   */
  function getDots() {
    return [...dots];
  }

  /**
   * Get enemy attributes
   * @returns
   */
  function getEnemy() {
    return {
      position: getEnemyPosition(),
      velocity: getEnemyVelocity(),
    };
  }

  return {
    getPlayer,
    gameOngoing,
    getEnemy,
    reversePlayerDirection,
    savePlayerPosition,
    getDots,
  };
}

function botController() {
  const game = interface();
  setInterval(main, 1); // ! Do not modify this line

  /**
   * Driver function for bot.
   * Do not modify this code unless you know what you are doing.
   * @returns void
   */
  function main() {
    if (!game.gameOngoing()) return;

    // call your strategy here
    creme332Strategy();
    // AnotherGoodNameStrategy();

    // save the position of your player
    // after strategy has been applied
    game.savePlayerPosition();
  }

  /**
   * Strategy that your bot will employ while game is ongoing.
   * It must make use of the game interface.
   */
  function creme332Strategy() {
    const currentPlayer = game.getPlayer();
    const currentEnemy = game.getEnemy();

    /**
     * Calculates displacement from player to enemy
     * @returns
     */
    function getPlayerEnemyGap() {
      return currentPlayer.position - currentEnemy.position;
    }

    if (
      Math.abs(getPlayerEnemyGap()) < 20 &&
      // if player and enemy are moving in opposite directions
      currentPlayer.velocity * currentEnemy.velocity < 0
    ) {
      game.reversePlayerDirection();
    }
  }

  /**
   * Strategy by user AnotherGoodName on HackerNews.
   *
   * Reference: https://news.ycombinator.com/item?id=38849868
   */
  function AnotherGoodNameStrategy() {
    /* direction of the enemy: to our right (1) or to our left (-1) */
    const dir = enemy.x > player.x ? 1 : -1;
    const nearWall = enemy.x < 10 || enemy.x > 90;
    /* if pac-man... */
    if (
      /* ...has no powerup or powerup expires in less than 10 "ticks" */
      powerTicks < 10 &&
      /* ...is headed toward enemy */ player.vx == dir &&
      /* ...is too close to enemy */ abs(player.x - enemy.x) <
        /* ...the distance before running away can be lower if we're near an edge */
        (dir == 1 ? player.x / 7 : (100 - player.x) / 7) + 7 &&
      /* and if enemy's state is not "eyes flying back" */
      enemy.eyeVx == 0
    ) {
      // "ArrowUp" or any arrow key reverses the direction of pac-man
      document.dispatchEvent(new KeyboardEvent("keydown", { code: "ArrowUp" }));
      document.dispatchEvent(new KeyboardEvent("keyup", { code: "ArrowUp" }));
    }
  }
}

setTimeout(function () {
  // botController must be called once all other scripts have executed.
  // The initial execution time is around 50ms.
  botController();
}, 50); // ! Do no adjust this delay otherwise a lot of variables will be undefined
