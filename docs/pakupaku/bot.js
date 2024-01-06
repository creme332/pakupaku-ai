/**
 * A game interface. Use this interface to get/set information in your bot algorithm.
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
   * Returns velocity of enemy
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
   * Returns velocity of player
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
   * @returns A value 1-100
   */
  function getEnemyPosition() {
    return enemy?.x;
  }

  /**
   * Movement direction of player
   * @returns 1 if player is moving right and -1 otherwise
   */
  function getPlayerDirection() {
    return player?.vx;
  }

  /**
   * Movement direction of enemy
   * @returns 1 if enemy is moving right and -1 otherwise
   */
  function getEnemyDirection() {
    if (!gameOngoing) return;
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
    strategy();
    game.savePlayerPosition();
  }

  /**
   * Strategy that your bot will employ while game is ongoing.
   * It must make use of the game interface.
   */
  function strategy() {
    const currentPlayer = game.getPlayer();
    const currentEnemy = game.getEnemy();

    /**
     * Make player run away from enemy by ensuring that player
     * and enemy moves in the same direction.
     */
    function flee() {
      const playerDirection = currentPlayer.velocity > 0 ? 1 : -1;
      const enemyDirection = currentEnemy.velocity > 0 ? 1 : -1;

      console.log(playerDirection, enemyDirection);
      // check if player is already fleeing and if so do nothing
      if (playerDirection == enemyDirection) return;

      game.reversePlayerDirection();
    }

    /**
     * Calculates distance between player and enemy
     * @returns A value 0-100
     */
    function getPlayerEnemyGap() {
      return Math.abs(currentPlayer.position - currentEnemy.position);
    }

    // console.log("player", game.getPlayer());
    // console.log("enemy", game.getEnemy());
    // console.log(game.getDots());
    if (getPlayerEnemyGap() < 20) flee();
  }
}

setTimeout(function () {
  // botController must be called once all other scripts have executed.
  // The initial execution time is around 50ms.
  botController();
}, 50); // ! Do no adjust this delay otherwise a lot of variables will be undefined
