module.exports = {
    name: 'channelDelete',
    run: async(bot, db, ...args) => {
        guild_autovoices(bot, db, ...args);
        stickyMessage(bot, db, ...args);
        guilds_reactionroles(bot, db, ...args);
    }
}

const guilds_reactionroles = async(bot, db, channel) => {
    const data = db('guilds_reactionroles');
    const reactionroles = data.get(channel.guild.id);

    Object.keys(reactionroles).map(async x => {
        if (reactionroles[x].channelID == channel.id) {
            data.delete(`${channel.guild.id}.${x}`)
        }
    })
}

const stickyMessage = (bot, db, channel) => {
    const sticky = db('stickymessages');

    if (sticky.get(channel.id)) {
        sticky.delete(channel.id)
    }
}

const guild_autovoices = (bot, db, channel) => {
    const guild = channel.guild;
    const settings = db('guilds_autovoices');
    const autoVoice = settings.get(guild.id);

    if (autoVoice) {
        if (autoVoice.creatorID && (channel.id == autoVoice.creatorID)) {
            settings.delete(guild.id)
        }

        if (autoVoice[channel.id]) {
            settings.delete(`${guild.id}.${channel.id}`)
        }
    }
}