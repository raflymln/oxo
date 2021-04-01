module.exports = {
    name: '247music',
    group: 'music',
    parent: '',
    run: async(bot, db, msg, args) => {

        const data = read('guilds/settings');
        const guild = msg.channel.guild

        if (data[guild.id]['247music']) throw 'Already Had 247 Music Channel!';

        const newChannel = await msg.channel.guild.createChannel('🎶﹥𝐎𝐱𝐎-247-music', 0, {
            topic: '**Type Your Song Title on this Channel to Play Music!**'
        })

        newChannel.send({
            embed: {
                author: {
                    name: 'Type Your Song Title to Start Playing Music!',
                    icon_url: 'https://i.ibb.co/y0kHFSy/play-button.png'
                },
                color: 3325350
            }
        })

        data[guild.id]['247music'] = newChannel.id
        write('guilds/settings', data);

    },
    options: {
        guildOnly: true,
        aliases: ['247'],
        requirements: {
            bot: ['manageChannels']
        }
    }
}