<h1 align="center">
  <br>
  <a href="https://github.com/vo-andrew/discord-bot">
  <img src="https://www.online-stopwatch.com/images/dice.png">
  </a>
  <br>
  Scrim Randomizer Bot
  <br>
</h1>

<h4 align="center">Fully randomized League of Legends teams and builds.</h4>

<p align="center">
  <a href=#>
    <img src="https://discordapp.com/api/guilds/185946930822512641/widget.png?style=shield">
  </a>

  <a href="https://www.python.org/downloads/">
    <img src="https://img.shields.io/pypi/pyversions/Red-Discordbot">
  </a>
  <a href="https://discord.js.org/#/">
     <img src="https://img.shields.io/badge/discord-js-yellow">
  </a>
  <a href=#>
    <img src="https://img.shields.io/badge/node%40latest-%3E%3D12.0.0-brightgreen">
  </a>
  <a href=#>
    <img src="https://img.shields.io/badge/docker%20build-passing-brightgreen">
  </a>
</p>

## What is Scrim Randomizer Bot?

Scrim Randomizer is a Discord bot that randomly creates teams of users and generates League of Legends builds. Users can create teams and generate builds without ever having to leave the Discord application.

## How does it work?

When a user sends a bot command to Scrim Randomizer, the user can select which members in the Discord server will participate in the randomized teams. After selecting users, the bot will send a GET request to the Riot Games API to generate builds for each person in the teams.

## Features & Commands

`!r help` - Provides a list of available commands when using Scrim Randomizer Bot.

`!r teams` - Creates a new poll where you can select users to be randomized.

`!r same` - Randomizes the same list of users that was chosen previously.
                            
`!r sr [same]` - Generates random champions and builds for Ultimate Bravery. Use the optional same keyword to randomize the same users.
                            
`!r aram [same]` - Generates random champions and builds for ARAM. Use the optional same keyword to randomize the same users.
                            
`!r reroll <sr/aram>` - Rerolls your current champion and build for Summoner's Rift/ARAM."

## Additional Notes
The bot is currently deployed on a Microsoft Azure Standard_B1s VM instance.
