module.exports = {
    bot: {
        options: {
            logChannelID: "789015280734175242",
            clientID: '762660297981820989',
            developersID: ['231721153444446208', '505373824641007618'],
            maxShards: 1,
            compress: true,
            restMode: true,
            nodes: [
                // { host: 'lavahost.idlesrv.xyz', port: 28669, region: 'eu', password: 'youshallnotpass' },
                // { host: 'localhost', port: 8080, region: 'us', password: 'oxo.my.id' }
            ]
        },
        commandOptions: {
            prefix: ["oxo", "@mention"],
            defaultHelpCommand: false,
            ignoreBots: false,
            defaultCommandOptions: {
                caseInsensitive: true,
                cooldown: 8000,
                cooldownExclusions: { userIDs: ['231721153444446208'] },
                alert: async(client, msg, type, content) => {

                    var img, color, emoji;

                    switch (type) {
                        case 0:
                        default:
                            img = 'https://i.ibb.co/rM8z4FM/remove.png'
                            color = 14700384
                            emoji = '⛔'
                            break;
                        case 1:
                            img = 'https://i.ibb.co/SmbyrDJ/checked.png'
                            color = 3325350
                            emoji = '✅'
                            break;
                    }

                    const embed = {
                        embed: {
                            color,
                            author: { name: content, icon_url: img }
                        }
                    }
                    msg.addReaction(emoji).catch(e => { return; })
                    return await client.send(msg.channel.id, embed, 0, 4000);

                },
                defaultAlerts: {
                    failed: `Bot Doesn't Have Enough Permission!`,
                    disabled: 'This Command is Disabled!',
                    invalidUsage: 'Invalid Command Usage!',
                    error: 'Encountered an Error!',
                    success: false,
                    permission: "You Don't Have Enough Permission to Do This!",
                    cooldown: 'Please Wait Before Sending Any Commands Again!',
                }
            }
        }
    },
    mongoDB: {
        connectOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            autoIndex: false
        },
        options: {
            onOpen: () => console.log('\x1b[47m\x1b[30m%s\x1b[0m', ' Connected to Database '),
            onError: (err) => console.log(err),
            onLoad: (size) => console.log(`> Loaded ${size} Collections`)
        }
    },
    web: {
        baseURL: 'localhost',
        links: {
            upvote: 'https://top.gg/bot/762660297981820989/vote',
            invite: 'https://discord.com/api/oauth2/authorize?client_id=762660297981820989&permissions=8&redirect_uri=https%3A%2F%2Foxo.my.id%2F&scope=bot',
            server: 'https://discord.gg/xvhU8ny',
            privacy_policy: 'https://docs.oxo.my.id/privacy-policy'
        },
    },
    canvas: {
        fonts: [
            'Jua',
            'SecularOne',
            'Ubuntu',
            'Pacifico',
            'Lilita'
        ]
    }
}