module.exports = {
    name: 'messageReactionRemove',
    run: async(bot, db, msg, emoji, memberID) => {
        if (!msg.guildID) return;

        var guild, channel, member;

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

        member = guild.members.get(memberID);
        if (member.bot) return;

        guilds_reactionroles(bot, db, msg, emoji, member);
    }
}

const guilds_reactionroles = (bot, db, msg, emoji, member) => {
    const reactionroles = db('guilds_reactionroles').get(`${msg.guildID}.${msg.id}`);

    if (reactionroles && util.toNumber(emoji.name)) {
        const emojiNumber = util.toNumber(emoji.name) - 1;
        member
            .removeRole(reactionroles.roles[emojiNumber])
            .catch(err => { return; })
    }
}