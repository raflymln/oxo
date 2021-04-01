module.exports = {
    name: 'voiceChannelSwitch',
    run: async(bot, db, member, newChannel, oldChannel) => {
        bot.emit('voiceChannelLeave', member, oldChannel);
        bot.emit('voiceChannelJoin', member, newChannel);
    }
}