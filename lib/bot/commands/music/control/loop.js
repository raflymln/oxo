module.exports = {
    name: 'loop',
    group: 'music',
    parent: '',
    run: async(bot, db, msg, args) => {

        const guild = msg.member.guild;
        const queue = read('guilds/musicplaylist');

        const checks = music.check(msg, [1, 2, 3], queue);
        if (checks !== true) throw checks;

        const loop = queue[guild.id].loop
        queue[guild.id].loop = !loop;
        write('guilds/musicplaylist', queue);

        msg.channel.send({
            embed: {
                color: 3325350,
                author: {
                    name: "Looping is Now " + ((loop) ? 'Disabled' : 'Enabled'),
                    icon_url: 'https://i.ibb.co/Czz7g3s/refresh-1.png'
                }
            }
        }, 0, 3000)

    },
    options: {
        guildOnly: true,
    }
}