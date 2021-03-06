const Teams = require("./teams.js");
const DisplayBuild = require("../displayBuild.js");
const { spawnSync } = require("child_process");

// Export command
module.exports = {
    name: "sr",
    cooldown: 30,
    guildOnly: true,
        async execute(msg, args) {
            guildId = args[args.length - 2];
            randomizedUsers = args[args.length - 1];
            let success = false;
            if (args[1] === randomizedUsers) {
                success = await Teams.createPoll(msg, randomizedUsers);
            }
            if (success || args[0] === "same") {
                success = Teams.shuffle(msg, randomizedUsers);
                if (success) {
                    randomizedUsers = randomizedUsers.map(user => user.split(" ").join("_"));
                    await spawnSync("python3", ["builds.py", `${randomizedUsers.join(" ")}`, "false", "false", "-1", `${guildId}`]);
                    DisplayBuild.displayBuild(msg);
                }
            }
        },
};