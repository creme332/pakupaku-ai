/*
* Original code (or parts of it) sourced from ABA Games under the MIT License.
  Modifications:
- Turned off sound
- Turned off game replay
- Game can be ended at any time by pressing Enter
- Added a couple of comments
*/

title = "PAKU PAKU";

description = `
[Tap] Turn
`;

characters = [
  `
  llll
 lll
lll
lll
 lll
  llll
`,
  `
  lll
 lllll
lll
lll
 lllll
  lll
`,
  `
  ll
 llll
llllll
llllll
 llll
  ll
`,
  `
  lll
 l l l
 llll
 llll
llll
l l l
`,
  `
  lll
 l l l
 llll
 llll
 llll
 l l
`,
  `
ll
ll
`,
  `
 ll
llll
llll
 ll
`,
  `
  l l



`,
];

options = {
  theme: "dark",
  viewSize: { x: 100, y: 50 },
  isPlayingBgm: true,
  isSoundEnabled: false,
  isReplayEnabled: false,
  seed: 9,
};

/** @type {{x: number, vx: number}} */
let player;
/**
 * eyeVx is the direction of movement of enemy's eyes. Enemy's eye moves when
 * enemy is dead.
 * @type {{x: number, eyeVx: number}} */
let enemy;
/** @type {{x: number, isPower: boolean}[]} */
let dots; // yellow dots that player eats
let powerTicks; // duration of power up
let animTicks;
let multiplier; // multiplier for game score

function update() {
  if (!ticks) {
    /// initialize game
    player = { x: 40, vx: 1 };
    enemy = { x: 100, eyeVx: 0 };
    multiplier = 0;
    addDots();
    powerTicks = animTicks = 0;
  }

  // make game faster with time
  animTicks += difficulty;

  color("black");
  text(`x${multiplier}`, 3, 9);
  if (input.isJustPressed) {
    // screen is tapped so change direction of player
    player.vx *= -1; // vx is the horizontal velocity of the player
  }
  // update player position
  // new position =  old position + velocity
  player.x += player.vx * 0.5 * difficulty;

  // check if player moved out of screen
  // and update position accordingly
  if (player.x < -3) {
    player.x = 103;
  } else if (player.x > 103) {
    player.x = -3;
  }

  color("blue");
  rect(0, 23, 100, 1);
  rect(0, 25, 100, 1);
  rect(0, 34, 100, 1);
  rect(0, 36, 100, 1);
  color("green");
  const ai = floor(animTicks / 7) % 4;

  char(addWithCharCode("a", ai === 3 ? 1 : ai), player.x, 30, {
    // @ts-ignore
    mirror: { x: player.vx },
  });

  remove(dots, (d) => {
    color(
      d.isPower && floor(animTicks / 7) % 2 === 0 ? "transparent" : "yellow"
    );
    const c = char(d.isPower ? "g" : "f", d.x, 30).isColliding.char;
    if (c.a || c.b || c.c) {
      // check if power dot is eaten
      if (d.isPower) {
        // play jump sound
        play("jump");

        // if enemy is alive, set duration of power to 120
        if (enemy.eyeVx === 0) {
          powerTicks = 120;
        }
      } else {
        // play hit sound when normal
        // dot is eaten
        play("hit");
      }
      addScore(multiplier);
      return true;
    }
  });

  const evx =
    enemy.eyeVx !== 0
      ? enemy.eyeVx
      : (player.x > enemy.x ? 1 : -1) * (powerTicks > 0 ? -1 : 1);

  // update enemy position so that it follows player
  enemy.x = clamp(
    enemy.x +
      evx *
        (powerTicks > 0 ? 0.25 : enemy.eyeVx !== 0 ? 0.75 : 0.55) *
        difficulty,
    0,
    100
  );

  // when enemy's eye reaches a wall, stop it from moving.
  if ((enemy.eyeVx < 0 && enemy.x < 1) || (enemy.eyeVx > 0 && enemy.x > 99)) {
    enemy.eyeVx = 0;
  }

  color(
    powerTicks > 0
      ? powerTicks < 30 && powerTicks % 10 < 5
        ? "black"
        : "blue"
      : enemy.eyeVx !== 0
      ? "black"
      : "red"
  );
  const c = char(
    enemy.eyeVx !== 0 ? "h" : addWithCharCode("d", floor(animTicks / 7) % 2),
    enemy.x,
    30,
    {
      // @ts-ignore
      mirror: { x: evx },
    }
  ).isColliding.char;

  if (enemy.eyeVx === 0 && (c.a || c.b || c.c)) {
    if (powerTicks > 0) {
      play("powerUp");
      addScore(10 * multiplier, enemy.x, 30);
      enemy.eyeVx = player.x > 50 ? -1 : 1;
      powerTicks = 0;
      multiplier++;
    } else {
      // when collision with enemy occurs, play explosion sound
      // and  end game
      play("explosion");
      end();
    }
  }
  powerTicks -= difficulty;

  // when all dots have been eaten, play coin sound
  // and add new dots
  if (dots.length === 0) {
    play("coin");
    addDots();
  }
}

function addDots() {
  let pi = player.x > 50 ? rndi(1, 6) : rndi(10, 15);
  dots = times(16, (i) => ({ x: i * 6 + 5, isPower: i === pi }));
  multiplier++;
}

// End game when enter key is pressed
document.body.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    end();
  }
});
