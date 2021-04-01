module.exports = {
    name: 'report',
    group: 'info',
    parent: '',
    run: async(bot, db, msg, args) => {

        if (args.length === 0 && msg.attachments.length === 0) throw 'Please Specify Report Messages!';

        const userDM = await bot.getDMChannel('231721153444446208');
        var content = []

        msg.attachments.forEach(x => content.push(x.url))

        bot.send(userDM.id, {
            "embed": {
                "description": args.join(' '),
                "color": 14700384,
                "fields": [{
                    "name": "Attachments:",
                    "value": (content.length > 0) ? content.join('\n') : 'No Attachments'
                }, {
                    "name": "Info:",
                    "value": [
                        `**Sender:** <@${msg.member.id}> (${msg.member.id})`,
                        `**Guild:** ${msg.member.guild.name} (${msg.member.guild.id})`
                    ].join('\n')
                }],
                "author": {
                    "name": "Reports",
                    "icon_url": "https://i.ibb.co/rM8z4FM/remove.png"
                }
            }
        });

    },
    options: {
        alerts: {
            success: 'The Report has been Successfully Sent',
            permission: 'Please Run This Command on Guild Only!'
        },
        guildOnly: true
    }
}