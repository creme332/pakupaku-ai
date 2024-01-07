# pakupaku-ai 👾
A simple bot for playing the 1D PAC-MAN game PakuPaku by ABA Games with a [high score of 300k+](./assets/best-score.gif).

![AI GIF](./assets/sample-ai.gif)

[![badge](https://img.shields.io/badge/AI%20Live%20Preview-000?style=for-the-badge&logo=probot&logoColor=%#00B0D8)
](https://creme332.github.io/pakupaku-ai/?pakupaku)
[![badge](https://img.shields.io/badge/Original%20Game-000?style=for-the-badge&logo=googleplay&logoColor=%#00B0D8)
](https://abagames.github.io/crisp-game-lib-11-games/?pakupaku)

## Features

- A refactored version of the original game
- An interface for writing your own bot
- 2 bot strategies

## Installation
> 🔴 **Requirements**: Git, Node.js 

Clone repository:
```bash
git clone git@github.com:creme332/pakupaku-ai.git
```

Install dependencies:
```bash
cd pakupaku-ai
npm install
```

## Usage

To run bot:
```
npm run start
```

Open http://localhost:4000/?pakupaku in your browser then tap on the screen once to start the game.

> 🟢 **Tip**: You can paste the code in `bot.js` directly into the console of the [original game](https://abagames.github.io/crisp-game-lib-11-games/?pakupaku).
> 
### Create your own bot

The default bot strategy used is `creme332Strategy`. You can easily create your own bot by creating your strategy function inside `botController` and then calling it in the `main` function.

All code for the bot is found in `docs/pakupaku/bot.js`. 

## Limitations
The `creme332Strategy` has several limitations:
- It can end up in a situation where it takes a very long time to eat the dots in the middle:

    ![bot taking a long time to eat middle dot](./assets/slow-to-eat-middle.gif)

- It can move too close to an enemy when power is about to expire:

    ![bot moving too close to enemy when power is about to expire](./assets/too-close-to-enemy.gif)

### Fixed ✅
The following limitations are no longer present in the current version of `creme332Strategy` but might be useful when building your own bot:

- It can move too close to the respawn point of the enemy and is unable to escape when enemy revives. 
  
    ![bot moving too close to respawn point of enemy](./assets/too-close-to-respawn.gif)

## To-do
- [ ] if distance between player and power up is small, go for powerup instead of fleeing
- [ ] increase animation tick to speed up game
- [x] add ability to pause game on key press
- [ ] what is enemy velocity when enemy is dead
- [ ] Rewrite other algorithms using interface
- [x] Improve `interface`:
    - [x] add get functions for `eye` of enemy
    - [x] add `powerTicks`
- [x] Add more documentation for original game code in `main.js`
- [ ] Minify javascript files

## Licenses

This repository includes code/content under various licenses:
- Code from `docs/pakupaku/main.js` is under the MIT License (see LICENSE-A)
- Code from `docs/pakupaku/bot.js` is under the MIT License (see LICENSE)

## References
- Code for pakupaku game: https://abagames.github.io/crisp-game-lib-11-games/pakupaku/main.js
- Other bot algorithms: https://news.ycombinator.com/item?id=38845510


