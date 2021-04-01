const Musixmatch = require('@raflymln/musixmatch-lyrics');

module.exports = {
    name: 'lyrics',
    group: 'music',
    parent: '',
    run: async(bot, db, msg, args) => {

        var query, result, fields = [];
        const guild = msg.member.guild;

        switch (args.length) {

            case 0:
                const queue = read('guilds/musicplaylist');
                const track = queue[guild.id] ? queue[guild.id].tracklist[0] : false;

                const checks = music.check(msg, [2, 5], queue);
                if (checks !== true) throw checks;

                query = track.info.title
                    .replace(/&/gi, "")
                    .replace(/[^a-z ]/gi, "")
                    .replace(/MV/gi, '')
                    .replace(/ft/gi, '')
                    .replace(/official/gi, '')
                    .replace(/lyrics/gi, '')
                    .replace(/lyric/gi, '')
                    .replace(/official/gi, '')
                    .replace(/video/gi, '')
                    .replace(/color coded/gi, '')
                    .replace(/music/gi, '')
                    .toLowerCase()
                break;

            default:
                query = args.join(' ').toLowerCase()
                break;

        }

        try {
            result = await Musixmatch.find(query);
        } catch (err) {
            throw err
        }

        const lyrics = result.lyrics.substring(0, 5000).replace(/\n/g, '<>').match(/.{1,800}(\s|$)/g)
        lyrics.forEach((x, i) => fields.push({
            name: '_ _',
            value: lyrics[i].replace(/<>/g, '\n')
        }));

        msg.channel.send({
            embed: {
                title: result.title,
                description: `**${result.artists}**`,
                url: result.url,
                color: 14700384,
                fields,
                thumbnail: { url: result.albumImg },
                footer: {
                    text: 'Lyrics by Musixmatch',
                    icon_url: 'https://lh3.googleusercontent.com/Hrp_zUTdmMnMWTdXi4GKUNwbix4ooYNSZrFl2VRwyyX_Gu49zLLO1X9q16zY8FZHog'
                },
                author: {
                    name: 'Song Lyrics',
                    icon_url: 'https://i.ibb.co/K7vWCfS/heart.png'
                }
            }
        });

    },
    options: {
        aliases: ['ly']
    }
}