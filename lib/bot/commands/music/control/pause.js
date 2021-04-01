module.exports = {
    name: 'pause',
    group: 'music',
    parent: '',
    run: async(bot, db, msg, args) => {

        const guild = msg.member.guild;
        const queue = read('guilds/musicplaylist');

        const checks = music.check(msg, [1, 2, 3], queue);
        if (checks !== true) throw checks;

        music.connection[guild.id].pause();

        msg.channel.send({
            embed: {
                color: 15051287,
                author: {
                    name: 'Pausing Music',
                    icon_url: 'https://i.ibb.co/BL2HyW2/pause.png'
                }
            }
        }, 0, 3000)

    },
    options: {
        guildOnly: true,
    }
}