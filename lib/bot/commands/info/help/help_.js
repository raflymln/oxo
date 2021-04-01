module.exports = {
    name: 'help',
    group: 'info',
    parent: '',
    run: async(bot, db, msg, args) => {

        const prefix = (msg.prefix) ? msg.prefix.replace('<@762660297981820989>', '@mention') : 'oxo';
        var embed;

        switch (args.length) {

            case 0:
                const baseURL = config.web.baseURL;
                const linkURL = `http://${baseURL}/r`
                const info = read('bot/info');
                const links = [
                    `[__[Invite Me!](${linkURL}/invite)__]`,
                    `[__[Website & Donation](http://${baseURL})__]`,
                    `[__[Documentation](http://docs.${baseURL})__]`,
                    `[__[Support Server](${linkURL}/server)__]`,
                    `[__[Upvote](${linkURL}/upvote)__]`,
                    `[__[Privacy Policy](${linkURL}/privacy_policy)__]`
                ];
                embed = {
                    description: "**OxO** is Your Friendly Discord Bot, Designed to Help Your Things on Discord, or Even, Your Life!",
                    color: 2537428,
                    author: {
                        name: 'Help Center',
                        icon_url: "https://i.ibb.co/vBxhxZk/info.png"
                    },
                    thumbnail: { url: bot.user.avatarURL },
                    fields: [{
                            "name": "📝 My Commands:",
                            "value": "**[Click Here](https://oxo.my.id/)**",
                            "inline": true
                        },
                        {
                            "name": "🧾 Guild Commands:",
                            "value": `**\`${prefix} help custom\`**`,
                            "inline": true
                        },
                        {
                            "name": "📊 Status:",
                            "value": `**\`${prefix} status\`**`,
                            "inline": true
                        },
                        {
                            "name": "📃 Command Info:",
                            "value": `**\`${prefix} help <command>\`**`,
                            "inline": true
                        },
                        {
                            "name": "⚠ Please Report an Error Using:",
                            "value": `**\`${prefix} report (Content)\`**`,
                            "inline": true
                        },
                        {
                            "name": "_ _",
                            "value": links.join(' ')
                        }
                    ]
                }

                break;

            default:
                const cmd = bot.commands[args[0]];
                var usage = cmd ? `http://${baseURL}/commands/${cmd.group}` : 'Cannot Find That Command';
                var status = cmd && cmd.enabled ? '🟢 Online' : '⚫ Not Available';
                embed = {
                    description: [`**Status:** ${status}`, `Command Usage:\n${usage}`].join('\n\n'),
                    color: 2537428,
                    author: {
                        name: 'Command Information',
                        icon_url: "https://i.ibb.co/vBxhxZk/info.png"
                    }
                }

                break;

        }

        msg.channel.send({ embed })

    },
    options: {
        aliases: ["h"]
    }
}