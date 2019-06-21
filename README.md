<p align="center">
    <img src="https://i.imgur.com/epINEbt.png">
</p>
<p align="center">
    <img src="https://img.shields.io/badge/version-2.6.2-blue.svg">
</p>

# Note
I recommend using `node-opus` package instead of `opusscript`. Opus didn't work for me so I selected an alternative.

# Setup
- Things you need to install:
    - [Node.js](https://nodejs.org/)
    - `npm i -g typescript`
    - Dependencies: `npm i`
    - [MongoDB](https://www.mongodb.com/download-center/community/)
    - [FFMpeg](https://ffmpeg.org/download.html) or `apt-get install ffmpeg` (this one is tricky, get help [here](https://discord.gg/bRCvFy9))
    - [Lavalink](https://ci.fredboat.com/viewLog.html?buildId=lastSuccessful&buildTypeId=Lavalink_Build&tab=artifacts&guest=1)
- Create the database by running the `initMongo.js` file
- Add your data to `config.json` file
- Place downloaded Lavalink.jar in main directory
- If you want music to work, use `java -jar Lavalink.jar` before you start the bot.
- Use one of the following commands:
    - `npm run build` to build bot and output files to `dist/`
    - `npm start` to start the bot (requires compiled files in `dist/`)
    - `npm test` to build and start the bot
    - `npm run test-dev` to start dashboard with hot reload
