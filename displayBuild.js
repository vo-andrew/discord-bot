const Discord = require("discord.js");

function displayBuild(msg) {
    const attachment = new Discord.MessageAttachment(`result${msg.guild.id}.jpg`);
    const embed = new Discord.MessageEmbed()
        .setTitle("League of Legends builds!")
        .setColor("GOLD")
        .setAuthor(name=msg.client.user.username, icon_url=msg.client.user.avatarURL())
        .attachFiles(attachment)
        .setImage(`attachment://result${msg.guild.id}.jpg`);
    msg.channel.send(embed);
}

module.exports.displayBuild = displayBuild;