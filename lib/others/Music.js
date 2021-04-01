const axios = require('axios');

module.exports = (bot, db) => new Main(bot, db)

class Main {
    constructor(bot, db) {
        this.bot = bot;
        this.db = db('music');
        this.connection = new Object();
    }

    check = (msg, checks, queue) => {

        const member = msg.member;
        const guild = member.guild;
        const userVoiceChannel = member.voiceState.channelID;
        const botVoiceChannel = guild.members.get(this.bot.user.id).voiceState.channelID

        // 1: User Voice Channel Check
        if (checks.includes(1) &&
            !userVoiceChannel
        ) return 'Please Join Voice Channel First!';

        // 2: Empty Playlist Check
        if (checks.includes(2) &&
            (!queue[guild.id] || (queue[guild.id] && !queue[guild.id].tracklist))
        ) return 'There are no any music playing right now!';

        // 3: Different Voice Channel Check
        const music = this.connection[guild.id] || {};

        if (checks.includes(3) &&
            music &&
            botVoiceChannel &&
            userVoiceChannel !== botVoiceChannel
        ) return 'Sorry, I\'ve Been Used in Different Voice Channel!';

        // 4: Music Playing Check
        if (checks.includes(4) &&
            music.playing
        ) return 'Sorry, I Still Playing a Music';

        // 5: Music NOT Playing Check
        if (checks.includes(5) &&
            !music.playing
        ) return 'Sorry, I Still Not Playing a Music Yet';

        return true;

    }

    search = async(name) => {

        const node = this.bot.voiceConnections.nodes.find(x => `${x.host}:${x.port}`);
        const query = `http://${node.host}:${node.port}/loadtracks?identifier=ytsearch:${encodeURIComponent(name.trim())}`;

        try {

            var result = await axios.get(query, {
                headers: {
                    'Authorization': node.password || 'youshallnotpass',
                    'Accept': 'application/json'
                }
            });

            result = result.data;
            if (!result || (result.tracks.length === 0)) throw 'Cannot Find That Music.';
            return result.tracks;

        } catch (err) {
            return false;
        }

    }

    play = async msg => {

        const member = msg.member;
        const guild = member.guild;

        const connection = this.connection[guild.id];
        const queue = read('guilds/musicplaylist');
        const track = queue[guild.id].tracklist[0];

        if (!connection || (connection && !connection.playing)) {

            this.bot
                .joinVoiceChannel(member.voiceState.channelID)
                .then(async player => {

                    this.connection[guild.id] = player
                    player.play(track.track);

                    const MUSIC_ALERT = await this.bot.send(msg.channel.id, {
                        embed: {
                            description: `**[${track.info.title}](${track.info.uri})**`,
                            color: 3325350,
                            thumbnail: { url: track.thumbnail },
                            author: {
                                name: 'Playing Music',
                                icon_url: 'https://i.ibb.co/y0kHFSy/play-button.png'
                            },
                            footer: {
                                text: 'Music by Youtube',
                                icon_url: 'https://www.iconfinder.com/data/icons/social-messaging-ui-color-shapes-2-free/128/social-youtube-circle-512.png'
                            },
                            fields: [{
                                    name: "YouTube:",
                                    value: `[${track.info.author}](${track.info.uri})`,
                                    inline: true
                                },
                                {
                                    name: "Duration:",
                                    value: util.prettyms(track.info.length),
                                    inline: true
                                },
                                {
                                    name: "Added By:",
                                    value: `<@${track.user.id}>`,
                                    inline: true
                                }
                            ]
                        }
                    });

                    player.on('error', console.log);
                    player.on('stuck', console.log)
                    player.on("disconnect", err => {
                        if (err) console.log(err);
                        setTimeout(() => this.play(msg), 1000);
                    });

                    player.on('end', (data, message) => {

                        if (data && data.reason && data.reason === 'REPLACED') return;
                        if (message) msg = message

                        this.bot.leaveVoiceChannel(member.voiceState.channelID);
                        MUSIC_ALERT.delete().catch(e => { return; })

                        const queue = read('guilds/musicplaylist');

                        if (queue[guild.id]) {

                            const SHIFTED_TRACK = queue[guild.id].tracklist.shift();
                            if (queue[guild.id].loop) queue[guild.id].tracklist.push(SHIFTED_TRACK);

                            switch (queue[guild.id].tracklist.length) {

                                case 0:
                                    delete this.connection[guild.id];
                                    delete queue[guild.id];
                                    break;

                                default:
                                    if (data !== 'stop') {

                                        setTimeout(() => this.play(msg), 1000);

                                    } else if (data == 'stop' && !queue[guild.id].loop) {

                                        queue[guild.id].tracklist.push(SHIFTED_TRACK);

                                    }
                                    break;

                            }

                        }

                        write('guilds/musicplaylist', queue);

                    });

                });

        }

    }

    skip = (msg, guild) => {

        if (this.connection[guild.id]) {
            this.connection[guild.id].emit('end', 'skip', msg)
        }

    }

    stop = (msg, guild) => {

        if (this.connection[guild.id]) {
            this.connection[guild.id].emit('end', 'stop', msg)
        }

    }
}