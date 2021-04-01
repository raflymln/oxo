module.exports = {
    name: 'resume',
    group: 'music',
    parent: '',
    run: async(bot, db, msg, args) => {

        const guild = msg.member.guild;
        const queue = read('guilds/musicplaylist');

        const checks = music.check(msg, [1, 2, 3], queue);
        if (checks !== true) throw checks;

        music.connection[guild.id].resume();

        msg.channel.send({
            embed: {
                color: 3325350,
                author: {
                    name: 'Resuming Music',
                    icon_url: 'https://i.ibb.co/y0kHFSy/play-button.png'
                }
            }
        }, 0, 3000)

    },
    options: {
        guildOnly: true
    }
};