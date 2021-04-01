module.exports = {
    name: 'search',
    group: 'music',
    parent: '',
    run: async(oxo, msg, args) => {

        var member = msg.member,
            guildID = member.guild.id,
            music = oxo.music[guildID],
            userVC = member.voiceState.channelID;

        if (!music) music = {}
        if (!music.queue) music.queue = [];

        if (!userVC) {
            oxo.alert(msg, 0, 'Please Join Voice Channel First!')
            return;
        }

        if (music.connection && music.queue[0] && music.queue[0].channel && music.queue[0].channel.voice && userVC !== music.queue[0].channel.voice) {
            oxo.alert(msg, 0, 'Sorry, I\'ve Been Used in Different Voice Channel!')
            return;
        }

        if (args.length === 0) {
            oxo.alert(msg, 0, 'Please Provide a Song Title to Play!');
            return;
        }

        if (music.queue.length >= 7) {
            oxo.alert(msg, 0, 'Sorry, You Can\'t Add More Than 7 Song.');
            return;
        }

        search = { result: [] };

        var yt = await yts(args.join(" ")),
            videos = yt.videos;

        for (var i = 0; i < 5; i++) {
            search.result.push({
                "name": `${i+1}) ${videos[i].title}`,
                "value": `[${videos[i].author.name}](${videos[i].author.url}) | [Original](${videos[i].url}) | ${videos[i].timestamp}`
            });
        }

        search.list = await oxo.answer(msg, {
            "embed": {
                "color": 14700384,
                "description": "Please Wait. . .",
                "author": {
                    "name": "Youtube Search",
                    "icon_url": 'https://i.ibb.co/PQCVWtz/list.png'
                },
                "footer": {
                    "text": "Music by Youtube",
                    "icon_url": "https://www.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-youtube-circle-512.png"
                }
            }
        });

        var filter = (m) => m.author.id === msg.member.id,
            collector = new MessageCollector(bot, msg.channel, filter, {
                time: 1000 * 20,
                max: 1
            });

        search.list.edit({
            "embed": {
                "description": "**Please Select a Song!**",
                "color": 14700384,
                "fields": search.result,
                "author": {
                    "name": "Youtube Search",
                    "icon_url": 'https://i.ibb.co/PQCVWtz/list.png'
                },
                "footer": {
                    "text": "Music by Youtube",
                    "icon_url": "https://www.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-youtube-circle-512.png"
                }
            }
        });

        collector.on("collect", async(m) => {
            await oxo.delete(search.list);

            switch (parseInt(m.content)) {
                case 1:
                    search.selected = 0
                    break;
                case 2:
                    search.selected = 1
                    break;
                case 3:
                    search.selected = 2
                    break;
                case 4:
                    search.selected = 3
                    break;
                case 5:
                    search.selected = 4
                    break;
                default:
                    return;
            }

            music.queue.push({
                title: videos[search.selected].title,
                url: videos[search.selected].url,
                timestamp: videos[search.selected].timestamp,
                thumbnail: videos[search.selected].thumbnail,
                author: {
                    name: videos[search.selected].author.name,
                    url: videos[search.selected].author.url
                },
                requester: {
                    user: member.username + "#" + member.discriminator,
                    username: member.username,
                    discriminator: member.discriminator,
                    id: member.id
                },
                channel: {
                    voice: userVC,
                    message: msg.channel.id
                }
            });

            await oxo.react(msg, '🎵');

            const alert = await oxo.answer(msg, {
                "embed": {
                    "description": `<@${member.id}>: [${videos[search.selected].title}](${videos[search.selected].url})`,
                    "color": 3325350,
                    "author": {
                        "name": "Added Music",
                        "icon_url": "https://i.ibb.co/p44NhzM/add.png"
                    },
                    "thumbnail": {
                        "url": videos[search.selected].thumbnail
                    }
                }
            }, 0, 3000)

            oxo.music[guildID] = music;
            oxo.music.play(guildID);
        });

        collector.on("end", async(collected) => {
            await oxo.delete(search.list);
        });

        return;

    },
    options: {
        enabled: false,
        aliases: ['-search']
    }
}