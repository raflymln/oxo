module.exports = {
    name: 'voicerename',
    group: 'utils',
    parent: '',
    run: async(bot, db, msg, args) => {
        const member = msg.member;
        const guild = member.guild;
        const voiceChannelID = member.voiceState.channelID

        if (!voiceChannelID) throw "You're Not in Voice Channel!";

        const settings = db('autovoice');
        const autoVoiceChannels = settings.get(`${guild.id}.channels`);

        if (autoVoiceChannels && autoVoiceChannels.map(x => x.id).includes(voiceChannelID)) {
            const channelOwner = autoVoiceChannels.find(x => x.id == voiceChannelID).owner;
            if (channelOwner == member.id) {
                const voiceChannel = guild.channels.get(voiceChannelID);
                voiceChannel.edit({ name: args.join(' ') });
            } else {
                throw "You're Not the Owner of This Channel!"
            }
        } else {
            throw "This Channel is Not Registered!"
        }

    },
    options: {
        aliases: ['vcrename'],
        argsRequired: true,
        guildOnly: true,
        alerts: {
            invalidUsage: "Please Provide Channel Name!",
            success: "Success Renaming Channel!"
        }
    }
}