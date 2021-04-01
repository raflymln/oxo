module.exports = {
    name: 'announce',
    group: 'admin',
    parent: '',
    run: async(bot, db, msg, args) => {

        const member = msg.member;
        msg.channel.send({
            embed: {
                color: 15051287,
                author: {
                    name: 'Announcement',
                    icon_url: 'https://i.ibb.co/7VP0JRs/star.png'
                },
                footer: {
                    text: `📣 Announcement By: ${member.username}#${member.discriminator}`
                },
                description: args.join(' ')
            }
        });

    },
    options: {
        aliases: ['say'],
        guildOnly: true,
        deleteCommand: true,
        argsRequired: true,
        alerts: {
            invalidUsage: 'Please Specify a Message to Announce!'
        },
        requirements: {
            permissions: {
                manageMessages: true
            }
        }
    }
}