module.exports = {
    name: 'remove',
    group: 'music',
    parent: '',
    run: async(bot, db, msg, args) => {

        var embed;
        const guild = msg.member.guild;
        const connection = music.connection[guild.id]
        const queue = read('guilds/musicplaylist');

        const checks = music.check(msg, [1, 2, 3], queue);
        if (checks !== true) throw checks;

        switch (args[0]) {

            case 'all':
                embed = {
                    author: {
                        name: 'Removed From Playlist',
                        icon_url: 'https://i.ibb.co/Yhvbvxc/cancel.png'
                    },
                    color: 14700384,
                    description: `Removed **All Music** From Playlist`,
                    footer: {
                        text: 'Music by Youtube',
                        icon_url: 'https://www.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-youtube-circle-512.png'
                    }
                }

                if (connection && connection.playing) {
                    queue[guild.id].tracklist = [];
                    setTimeout(() => music.stop(guild), 2000);
                } else {
                    delete queue[guild.id]
                }
                break;

            default:
                const selected = (isNaN(args[0])) ? false : parseInt(args[0]);
                if (!selected) throw 'Please Specify Order of the Music to Delete';

                const tracklist = queue[guild.id].tracklist;

                embed = {
                    author: {
                        name: 'Removed From Playlist',
                        icon_url: 'https://i.ibb.co/Yhvbvxc/cancel.png'
                    },
                    color: 14700384,
                    description: `Removed **${tracklist[selected-1].info.title}**`,
                    footer: {
                        text: 'Music by Youtube',
                        icon_url: 'https://www.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-youtube-circle-512.png'
                    }
                }

                if (selected - 1 == 0 && (connection && connection.playing)) {
                    music.skip(guild)
                } else {
                    queue[guild.id].tracklist.splice(selected - 1, 1);
                }
                break;

        }

        write('guilds/musicplaylist', queue);
        msg.channel.send({ embed }, 0, 3000);

    },
    options: {
        argsRequired: true,
        guildOnly: true,
        alerts: {
            invalidUsage: 'Please Specify Order of the Music to Delete'
        }
    }
}