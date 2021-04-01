module.exports = {
    name: 'list',
    group: 'admin',
    parent: 'warn',
    run: async(bot, db, msg, args) => {

        const guild = msg.member.guild;
        const data = db('userwarns').get(guild.id);
        const userID = (args[0]) ? args[0].replace(/\D/g, "") : undefined;
        var list = []

        if (!data) throw 'No Warns on This Guild!';

        switch (args.length) {

            case 0:
                var warnUser = [];
                data.map(x => {
                    if (warnUser.indexOf(x.userID) == -1) warnUser.push(x.userID);
                })

                warnUser.map((x, i) => {
                    const warnTotal = data.filter(c => c.userID == x).length
                    list.push(`**${i+1})** <@${x}> > **${warnTotal}**x`)
                })
                break;

            default:

                const userWarns = data.filter(x => x.userID == userID);
                if (!userWarns || (userWarns && userWarns.length == 0)) throw 'The User Specified has No Warns!';

                userWarns.map((x, i) => {
                    const timestamp = new Date(x.timestamp).toLocaleString('en-US');
                    const m = [
                        `**[Warn ID: ${x.ID}] ${timestamp}** - <@${x.moderatorID}>`,
                        '```cs',
                        x.reason,
                        '```'
                    ]
                    list.push(m.join('\n'))
                });
                break;

        }

        msg.channel.send({
            embed: {
                color: 14700384,
                description: list.join('\n'),
                author: {
                    name: 'Warn List',
                    icon_url: "https://i.ibb.co/PQCVWtz/list.png"
                }
            }
        })

    },
    options: {
        guildOnly: true,
        requirements: {
            permissions: {
                manageMessages: true
            }
        }
    }
}