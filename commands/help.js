const Discord = require("discord.js");

// Export command
module.exports = {
	name: "help",
        guildOnly: true,
	execute(msg, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Features & Commands")
            .setColor("BLUE")
            .setAuthor(name=msg.client.user.username, icon_url=msg.client.user.avatarURL())
            .setDescription("**!r help** - Provides a list of available commands when using Scrim Randomizer Bot.\n\n \
                            **!r teams** - Creates a new poll where you can select users to be randomized.\n\n \
                            **!r same** - Randomizes the same list of users that was chosen previously.\n\n \
                            **!r sr [same]** - Generates random champions and builds for Ultimate Bravery. Use the optional same keyword to randomize the same users.\n\n \
                            **!r aram [same]** - Generates random champions and builds for ARAM. Use the optional same keyword to randomize the same users.\n\n \
                            **!r reroll <sr/aram>** - Rerolls your current champion and build for Summoner's Rift/ARAM.");
        msg.channel.send(embed);
	},
};
