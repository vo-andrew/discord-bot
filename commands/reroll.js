const DisplayBuild = require("../displayBuild.js");
const fs = require("fs");
const { spawnSync } = require("child_process");

// Export command
module.exports = {
    name: "reroll",
    cooldown: 5,
    guildOnly: true,
        async execute(msg, args) {
            if (args.length !== 3) {
                msg.reply("The correct usage of the \`reroll\` command is \`!r reroll <sr/aram>\`. Ex: \`!r reroll sr\`.");
                return;
            }
            guildId = args[args.length - 2];
            randomizedUsers = args[args.length - 1];
            let index = -1;
            for (let i = 0; i < randomizedUsers.length; i += 1) {
                if (msg.member.displayName === randomizedUsers[i]) {
                    index = i;
                    break;
                }
            }
            if (index === -1 || randomizedUsers.length < 2 || !fs.existsSync(`./result${guildId}.jpg`)) {
                msg.reply("Please generate teams and builds before rerolling using \`!r <sr/aram>\`. Ex: \`!r sr\`.");
                return;
            }
            randomizedUsers = randomizedUsers.map(user => user.split(" ").join("_"));
            if (args[0] === "sr") {
                await spawnSync("python3", ["builds.py", `${randomizedUsers.join(" ")}`, "false", "true", `${index}`, `${guildId}`]);
            } else if (args[0] === "aram") {
                await spawnSync("python3", ["builds.py", `${randomizedUsers.join(" ")}`, "true", "true", `${index}`, `${guildId}`]);
            } else {
                msg.reply("You did not specify the gamemode you wanted to reroll for.");
                return;
            }
            DisplayBuild.displayBuild(msg);
        },
};
