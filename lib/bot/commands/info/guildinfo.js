module.exports = {
    name: 'guildinfo',
    group: 'info',
    parent: '',
    run: async(bot, db, msg, args) => {

        const guild = (args[0]) ? bot.guilds.get(args[0]) : msg.member.guild;
        const guildPrefix = String(bot.guildPrefixes[guild.id]).replace('<@762660297981820989>', '@mention')
        if (!guild) throw 'Cannot Find that Guild Information on Our Database!';

        var eventStatus = [];
        const data = read('guilds/settings')[guild.id];
        const events = [
            'join_channel',
            'leave_channel',
            'join_message',
            'leave_message',
            'join_pm',
            'leave_pm',
            'join_card',
            'leave_card',
            'auto_role'
        ];

        events.forEach((name, index) => {

            const checkEvent = ev => {

                var event = ev
                    .replace('_', ' ')
                    .replace(/pm/gi, 'Private Message')
                    .toLowerCase()
                    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

                return data[ev] ? `${event}: *__Configured__*` : `${event}: **Not Configured**`;

            }

            eventStatus.push(`${index+1}) ${checkEvent(name)}`)

        });

        msg.channel.send({
            embed: {
                title: guild.name,
                description: `Region: __${guild.region.toUpperCase()}__`,
                color: 2537428,
                thumbnail: {
                    url: guild.iconURL
                },
                author: {
                    name: 'Guild Info',
                    icon_url: 'https://i.ibb.co/vBxhxZk/info.png'
                },
                footer: {
                    text: "📝 Data Provided are Synced with Server."
                },
                fields: [{
                        "name": "Owner",
                        "value": `<@${guild.ownerID}>`,
                        "inline": true
                    },
                    {
                        "name": "Total Member",
                        "value": guild.memberCount,
                        "inline": true
                    },
                    {
                        "name": "Guild Prefix",
                        "value": `\`${guildPrefix}\``,
                        "inline": true
                    },
                    {
                        "name": "Created At",
                        "value": new Date(guild.createdAt).toLocaleDateString(),
                        "inline": true
                    },
                    {
                        "name": "OxO Joined At",
                        "value": new Date(guild.joinedAt).toLocaleDateString(),
                        "inline": true
                    },
                    {
                        "name": "Events",
                        "value": eventStatus.join('\n')
                    }
                ]
            }
        })

    },
    options: {
        guildOnly: true,
        aliases: ['gi']
    }
}