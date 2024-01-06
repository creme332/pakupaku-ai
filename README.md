# pakupaku-ai 👾
A simple bot for playing the 1D PAC-MAN game PakuPaku by ABA Games. The [highest score](./assets/best-score.gif) reached is around 43000.

![AI GIF](./assets/sample-ai.gif)

[![badge](https://img.shields.io/badge/AI%20Live%20Preview-000?style=for-the-badge&logo=probot&logoColor=%#00B0D8)
](https://creme332.github.io/pakupaku-ai/?pakupaku)
[![badge](https://img.shields.io/badge/Original%20Game-000?style=for-the-badge&logo=googleplay&logoColor=%#00B0D8)
](https://abagames.github.io/crisp-game-lib-11-games/?pakupaku)

This repository contains a copy of the [original game](docs/pakupaku/main.js), an interface for writing your own bot, and some sample strategies for the bot. [bot](docs/pakupaku/bot.js).
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
You can easily create your own bot by modifying `bot.js`. The default strategy used is `creme332Strategy`.

Run your bot:
```
npm run start
```

Open http://localhost:4000/?pakupaku in your browser.

> 🟢 **Tip**: You can paste the code in `bot.js` directly into the console of the [original game](https://abagames.github.io/crisp-game-lib-11-games/?pakupaku).

## To-do
- [ ] Rename `docs` to `src`
- [ ] if distance between player and power up is small, go for powerup instead of fleeing
- [ ] deploy on github
- [ ] download dependencies
- [ ] create a release

## Limitations
My bot which uses the `creme332Strategy` has several limitations:
- It can sometimes hesitate to take the power up dot and a situation as shown below persists for some time:
    ![git showing bot hesitation](./assets/ai-hesitation.gif)
- It can end up too close to the eye of the dead enemy and is unable to escape when enemy revives. 

## References
- Code for pakupaku game: https://abagames.github.io/crisp-game-lib-11-games/pakupaku/main.js
- Other bot algorithms: https://news.ycombinator.com/item?id=38845510


