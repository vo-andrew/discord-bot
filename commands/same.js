const Teams = require("./teams.js");

// Export command
module.exports = {
	name: "same",
    cooldown: 5,
    guildOnly: true,
	execute(msg, args) {
        Teams.shuffle(msg, args[args.length - 1]);
	},
};