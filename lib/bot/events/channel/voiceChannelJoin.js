module.exports = {
    name: 'voiceChannelJoin',
    run: async(bot, db, ...args) => {
        guild_autovoices(bot, db, ...args);
    }
}

const guild_autovoices = async(bot, db, member, channel) => {
    const guild = channel.guild;
    const parentID = channel.parentID;
    const settings = db('guilds_autovoices');
    const autoVoiceID = settings.get(`${guild.id}.creatorID`);

    if (autoVoiceID && (channel.id == autoVoiceID)) {
        const newChannel = await guild.createChannel(`${member.username}'s Room`, 2, { parentID });
        newChannel.editPermission(member.id, 2147483647, 0, "member");

        settings.set(`${guild.id}.${newChannel.id}`, member.id);
        member.edit({ channelID: newChannel.id });
    }
}