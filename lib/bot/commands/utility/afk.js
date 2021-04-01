module.exports = {
    name: 'afk',
    group: 'utils',
    parent: '',
    run: async(bot, db, msg, args) => {

        const member = msg.member;
        const status = db('afks').get(member.id) || db('afks').get(`${msg.guildID}_${member.id}`);
        const sync = (args[0] && (args[0] == 'sync')) ? true : false;

        if (!status) {
            var AFKID = `${msg.guildID}_${member.id}`
            var server = 'on this Server';
            var reason = msg.realContent || 'No Reason';

            if (sync) {
                AFKID = member.id
                server = 'across all Server'
                reason = reason.replace('sync', '');
            }

            db('afks').set(AFKID, reason);
            msg.channel.send({
                embed: {
                    description: [
                        `Your AFK Status is Successfully Set Up **${server}**!\n`,
                        "**Reason:**",
                        `\`\`\`${reason}\`\`\``
                    ].join('\n'),
                    author: {
                        name: "AFK Status",
                        icon_url: 'https://i.ibb.co/vBxhxZk/info.png'
                    },
                    color: 2537428
                }
            })
        }

    },
    options: {
        guildOnly: true
    }
}