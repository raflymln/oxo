module.exports = {
    name: 'messageReactionAdd',
    run: async(bot, db, msg, emoji, member) => {
        if (!msg.guildID) return;

        var guild, channel;

        try {
            guild = msg.channel.guild
        } catch (err) {
            guild = bot.guilds.get(msg.guildID)
        }

        try {
            channel = msg.channel.id
        } catch (err) {
            channel = guild.channels.get(msg.channel.id);
        }

        if (!member.guild) {
            member = guild.members.get(member.id)
        }

        if (member.bot) return;

        guilds_reactionroles(bot, db, msg, emoji, member);
    }
}

const guilds_reactionroles = (bot, db, msg, emoji, member) => {
    const reactionroles = db('guilds_reactionroles').get(`${msg.guildID}.${msg.id}`);

    if (reactionroles && util.toNumber(emoji.name)) {
        const emojiNumber = util.toNumber(emoji.name) - 1;
        member
            .addRole(reactionroles.roles[emojiNumber])
            .catch(err => { return; })
    }
}