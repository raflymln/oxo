module.exports = {
    name: 'skip',
    group: 'music',
    parent: '',
    run: async(bot, db, msg, args) => {

        const guild = msg.member.guild;
        const queue = read('guilds/musicplaylist');

        const checks = music.check(msg, [1, 2, 3], queue);
        if (checks !== true) throw checks;

        music.skip(msg, guild);

        msg.channel.send({
            embed: {
                color: 2537428,
                author: {
                    name: 'Skipping Music',
                    icon_url: 'https://i.ibb.co/Mf4Ktgn/next-1.png'
                }
            }
        }, 0, 3000);

    },
    options: {
        guildOnly: true
    }
}