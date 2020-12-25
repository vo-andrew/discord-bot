const Teams = require("./teams.js");
const DisplayBuild = require("../displayBuild.js");
const { spawnSync } = require("child_process");

// Export command
module.exports = {
    name: "reroll",
    cooldown: 5,
    guildOnly: true,
        async execute(msg, args) {
            if (args.length !== 2) {
                msg.reply("The correct usage of the \`reroll\` command is \`!r reroll <sr/aram>\`. Ex: \`!r reroll sr\`.");
                return;
            }
            randomizedUsers = args[args.length - 1];
            let index = -1;
            for (let i = 0; i < randomizedUsers.length; i += 1) {
                if (msg.member.displayName === randomizedUsers[i]) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                msg.reply("Please generate teams before rerolling.");
                return;
            }
            if (args[0] === "sr") {
                await spawnSync("python3", ["builds.py", `${randomizedUsers.length}`, "false", "true", `${index}`]);
            } else if (args[0] === "aram") {
                await spawnSync("python3", ["builds.py", `${randomizedUsers.length}`, "true", "true", `${index}`]);
            } else {
                msg.reply("You did not specify the gamemode you wanted to reroll for.");
                return;
            }
            DisplayBuild.displayBuild(msg);
        },
};