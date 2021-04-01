module.exports = {
    name: 'playlist',
    group: 'music',
    parent: '',
    run: async(bot, db, msg, args) => {

        var playlist = []
        const guild = msg.member.guild;
        const queue = read('guilds/musicplaylist');

        const checks = music.check(msg, [2], queue);
        if (checks !== true) throw checks;

        const tracklist = queue[guild.id].tracklist

        tracklist.forEach((data, index) => {

            const info = data.info;

            playlist.push({
                "name": `${index+1}) ${info.title}`,
                "value": [
                    `[${info.author}](${info.uri}) | [Original](${info.uri}) | \`${util.prettyms(info.length)}\``,
                    `\`Requested By:\` <@${data.user.id}>`
                ].join('\n')
            })

        });

        const loop = queue[guild.id].loop ? '__Enabled__' : '**Disabled**';

        msg.channel.send({
            embed: {
                color: 14700384,
                description: `**Current Music Playlist**\n🔄 Loop: ${loop}`,
                fields: playlist,
                author: {
                    name: 'Playlist',
                    icon_url: 'https://i.ibb.co/PQCVWtz/list.png'
                },
                footer: {
                    text: 'Music by Youtube',
                    icon_url: 'https://www.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-youtube-circle-512.png'
                }
            }
        })

    },
    options: {
        guildOnly: true,
        aliases: ['pl']
    }
}