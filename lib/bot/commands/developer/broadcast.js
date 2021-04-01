module.exports = {
    name: 'broadcast',
    group: 'dev',
    parent: '',
    run: async(bot, db, msg, args) => {

        bot.guilds.map(guild => {

            var sent = false;
            guild.channels
                .filter(channel => channel.type === 0)
                .map(channel => {

                    if (!sent) sent = channel.send({
                        embed: {
                            description: msg.realContent,
                            color: 15051287,
                            author: {
                                name: 'Broadcast Message',
                                icon_url: "https://i.ibb.co/dcG8yHk/speaker.png"
                            }
                        }
                    });

                })

        });

    },
    options: {
        devOnly: true,
        alerts: {
            success: 'Broadcasted!'
        },
        aliases: ['bc']
    }
}