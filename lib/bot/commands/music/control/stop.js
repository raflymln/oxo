module.exports = {
    name: 'stop',
    group: 'music',
    parent: '',
    run: async(bot, db, msg, args) => {

        const member = msg.member;
        const guild = member.guild;
        const queue = read('guilds/musicplaylist');

        const checks = music.check(msg, [1, 2, 3], queue);
        if (checks !== true) throw checks;

        const voiceChannelID = guild.members.get(bot.user.id).voiceState.channelID;

        if (!music.connection[guild.id]) {
            bot.leaveVoiceChannel(voiceChannelID)
        } else {
            if (!voiceChannelID) {
                bot.joinVoiceChannel(member.voiceState.channelID)
            }
            music.stop(msg, guild)
        }

        msg.channel.send({
            embed: {
                color: 14700384,
                author: {
                    name: 'Stopping Music',
                    icon_url: 'https://i.ibb.co/SKscRF6/stop.png'
                }
            }
        }, 0, 3000);

    },
    options: {
        guildOnly: true
    }
}