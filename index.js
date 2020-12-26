// Import dotenv to read .env file
require("dotenv").config();
// Import Node's native file system module
const fs = require("fs");
// Import needed Discord libraries
const Discord = require("discord.js");
// Create Discord client and set command files
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}
// The amount (in seconds) that the user will have to wait before being able to properly use that command again
const cooldowns = new Discord.Collection();

// randomizedUsers holds the nicknames of the chosen randomized users mapped per guild
let randomizedUsers = new Discord.Collection();

// Ready event
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Message event
client.on("message", async msg => {
  // If the message either doesn't start with the prefix or was sent by the bot, exit early
  if (!msg.content.startsWith("!r") || msg.author.bot) return;
  // Create an args variable that slices off the prefix entirely, 
  // removes the leftover whitespaces and then splits it into an array by spaces
  const args = msg.content.slice(2).trim().split(/ +/);
  // Create a command variable by calling args.shift(), which will take the first 
  // element in array and return it while also removing it from the original array
  const commandName = args.shift().toLowerCase();
  // If there isn't a command with that name, exit early
  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);
  // Commands are only executable in servers
  if (command.guildOnly && msg.channel.type === "dm") {
	  return msg.reply("I can\'t execute that command inside DMs!");
  }
  // Check if the cooldowns Collection has the command set in it yet. If not, then add it in
  if (!cooldowns.has(command.name)) {
	  cooldowns.set(command.name, 0);
  }
  // Current timestamp
  const now = Date.now();
  // Get the timestamp for the triggered command
  const timestamp = cooldowns.get(command.name);
  // Gets the necessary cooldown amount, defaulting to 1. Convert to milliseconds
  const cooldownAmount = (command.cooldown || 1) * 1000;
  // Calculate when the user will be able to reuse the same command again
  const expirationTime = timestamp + cooldownAmount;
  // If the command has recently been used, return
  if (now < expirationTime) {
    const timeLeft = (expirationTime - now) / 1000;
    return msg.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before using the \`${command.name}\` command.`);
  }
  // Set the command timestamp usage to the current time
  cooldowns.set(command.name, now);
  // Execute commands
  try {
    if (!(msg.guild.id in randomizedUsers)) {
      randomizedUsers[msg.guild.id] = [];
    }
    args.push(randomizedUsers[msg.guild.id]);
	  command.execute(msg, args);
  } catch(error) {
	  console.error(error);
	  msg.reply("There was an error trying to execute that command!");
  }
});

// Login into the Discord bot
client.login(process.env.TOKEN);
