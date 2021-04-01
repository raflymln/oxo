module.exports = {
    name: 'voiceChannelLeave',
    run: async(bot, db, ...args) => {
        guild_autovoices(bot, db, ...args);
    }
}

const guild_autovoices = async(bot, db, member, channel) => {
    if (channel.voiceMembers.size !== 0) return;

    const guild = channel.guild;
    const settings = db('guilds_autovoices');
    const AVChannels = settings.get(`${guild.id}.${channel.id}`);

    if (AVChannels) {
        if (channel) {
            channel
                .delete()
                .catch(err => { return; });
        }
        settings.delete(`${guild.id}.${channel.id}`)
    }
}