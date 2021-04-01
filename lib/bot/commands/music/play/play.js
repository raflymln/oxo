module.exports = {
    name: 'play',
    group: 'music',
    parent: '',
    run: async(bot, db, msg, args) => {

        const member = msg.member;
        const guild = member.guild;

        console.log(`> Music Command Executed on Guild: ${guild.name}`)

        const connection = music.connection[guild.id]
        const queue = read('guilds/musicplaylist');
        if (!queue[guild.id]) queue[guild.id] = {
            loop: false,
            tracklist: []
        };

        const checks = music.check(msg, [1, 3], queue);
        if (checks !== true) throw checks;
        msg.react('✅')

        switch (args.length) {

            case 0:
                if (queue[guild.id].tracklist.length === 0) throw 'No Last Songs in Guild Playlist.';
                if (connection && connection.playing) throw 'Already Playing Music!';
                break;

            default:
                try {

                    const result = await music.search(args.join(' '));
                    if (!result) throw 'Error While Finding Song, Please Try Again!';

                    const track = Object.assign({
                        user: {
                            username: member.username,
                            discriminator: member.discriminator,
                            id: member.id
                        },
                        thumbnail: `https://img.youtube.com/vi/${result[0].info.uri.replace('https://www.youtube.com/watch?v=', '')}/0.jpg`
                    }, result[0])

                    queue[guild.id].tracklist.push(track);
                    write('guilds/musicplaylist', queue);

                    msg.channel.send({
                        embed: {
                            color: 3325350,
                            description: `[${track.info.title}](${track.info.uri})`,
                            thumbnail: { url: track.thumbnail },
                            author: {
                                name: 'Added Music',
                                icon_url: 'https://i.ibb.co/y0kHFSy/play-button.png'
                            }
                        }
                    }, 0, 3000)

                } catch (err) {
                    throw err
                }
                break;

        }

        music.play(msg)

    },
    options: {
        guildOnly: true,
        alerts: {
            invalidUsage: 'Please Provide a Song Title to Play!'
        },
        aliases: ['p'],
        requirements: {
            bot: ['voiceConnect', 'voiceSpeak', 'voiceUseVAD']
        }
    }
}