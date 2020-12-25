// Import array shuffling algorithm
const Shuffle = require("../shuffle.js");
// Import needed Discord libraries
const Discord = require("discord.js");

// Define reaction constants for creating polls
const REACTIONS = [
  "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣",  
  "🔟", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "🟤", "⚫", "⚪"
];

// Create a poll to choose users to randomize
const createPoll = async (msg, randomizedUsers) => {
  // Check if the user is in a voice channel
  if (msg.member.voice.channel != null) {
    // Create a new MessageEmbed and set its details
    const embed = new Discord.MessageEmbed()
      .setTitle("Select the users participating in the scrim!")
      .setColor("AQUA")
      .setAuthor(name=msg.client.user.username, icon_url=msg.client.user.avatarURL())
      .setDescription("React with the appropriate emoji for each user you want to be included in the randomizer.\n\n \
                      After 10 seconds of inactivity, your selections will be confirmed.");
    // Extract the nicknames of all users in the voice channel
    const memberNames = msg.member.voice.channel.members.map(member => member.displayName);
    // reactionToUsers maps each reaction in REACTIONS to an associated user nickname
    const reactionToUsers = {};
    // Limit the number of choosable users to 20 (Discord limits 20 reactions per message)
    numPeople = Math.min(20, memberNames.length);
    for (let i = 0; i < numPeople; i += 1) {
      // Add a field to the embed message containing the user nickname and their corresponding emoji
      embed.addField(memberNames[i], REACTIONS[i], inline=true);
      // Keep track of which emoji corresponds to which nickname
      reactionToUsers[REACTIONS[i]] = memberNames[i];
    }
    // Filter function to remove invalid reactions
    const filter = (reaction, user) => {
	    return REACTIONS.includes(reaction.emoji.name) && user.id === msg.author.id;
    };
    // Send embed message and react to it with emojis
    let m = await msg.channel.send(embed);
    for (let i = 0; i < numPeople; i += 1) {
      m.react(REACTIONS[i]);
    }
    // Wait for user's reactions to choose users and reset contents of randomizedUsers
    randomizedUsers.length = 0;
    try {
      let collected = await m.awaitReactions(filter, { max: 20, idle: 10000, errors: ['time'] });
      for (let reaction of collected) {
          randomizedUsers.push(reactionToUsers[reaction[0]]);
      }
    } catch(partialCollection) {
      for (let reaction of partialCollection) {
          randomizedUsers.push(reactionToUsers[reaction[0]]);
      }
    }
    // Indicate that a poll was successfully created
    return true;
  } else {
    // Exit poll creation if the user is not in a voice channel
    msg.reply("Please join a voice channel to randomize users.");
    // Indicate that a poll was not successfully created
    return false;
  }
};

// Randomizes the randomizedUsers array
const shuffle = (msg, randomizedUsers) => {
  if (randomizedUsers.length < 2) {
    msg.reply("Please choose at least 2 users to create teams.");
    // Indicate that shuffling was unsuccessful
    return false;
  }
  // Shuffle randomizedUsers in-place
  Shuffle.shuffleArray(randomizedUsers);
  const description = randomizedUsers.map((user, index) => `${index + 1}. ${user}\n`);
  const split = Math.ceil(randomizedUsers.length / 2);
  // Create a new MessageEmbed and set its details
  const embed = new Discord.MessageEmbed()
    .setTitle("Randomized teams!")
    .setColor("LUMINOUS_VIVID_PINK")
    .setAuthor(name=msg.client.user.username, icon_url=msg.client.user.avatarURL());
  embed.addField("Team 1", description.slice(0, split).join(" "), inline=true);
  embed.addField("Team 2", description.slice(split).join(" "), inline=true);
  msg.channel.send(embed);
  // Indicate that shuffling was successful
  return true;
};

// Export command
module.exports = {
	name: "teams",
  cooldown: 20,
  guildOnly: true,
  createPoll: createPoll,
  shuffle: shuffle,
	async execute(msg, args) {
		const success = await createPoll(msg, args[args.length - 1]);
    if (success) {
      shuffle(msg, args[args.length - 1]);
    }
	},
};