<p align="center">
    <img src="https://i.imgur.com/epINEbt.png">
</p>
<p align="center">
    <img src="https://img.shields.io/badge/version-2.0.1-blue.svg">
</p>

# Setup
- Install node.js [here](https://nodejs.org/)
- Install typescript using `npm i -g typescript`
- Add your token to `config.json` file
- Add your OpenWeatherApi's app_id to `src/commands/weather.ts`
- Use one of these following commands:
    - `npm run build` to build bot and output files to `compile/`
    - `npm start` to start the bot (requires compiled files in `compile/`)
    - `npm test` to build and start the bot

# Changelog
## 2.0.0:
- Grouped commands
- Moved OpenWeatherApi's token to `config.json` file
- Modified `package.json`'s scripts
- Added commands: `autorole`, `ban`, `greeting`, `ping`, `calculate`, `solve`
- Added `guildMemberAdd` event
- Removed `test` command
- Created `data` directory including `guildInfo.json`
- Extended `Bot` class by `GuildDataHandler`
## 2.0.1:
- Added `giveaway` command
- Added `utils` subdirectory in `src/`
- Added time parser

# TODO
- Commands:
    - [x] giveaway
    - [ ] kick
    - [ ] mute
    - [ ] poll
    - [ ] eval
- [ ] Livestream & new Youtube video notifications
- [ ] Music
- [ ] Stat channels
- [ ] Webpanel