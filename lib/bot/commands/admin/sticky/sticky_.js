module.exports = {
    name: 'sticky',
    group: 'admin',
    parent: '',
    run: async(bot, db, msg, args) => {

        const guild = msg.member.guild;
        const channel = msg.channel;
        const member = msg.member;

        const sticky = db('guilds_stickymessages');
        const stickymsg = sticky.get(`${guild.id}.${channel.id}`);
        if (stickymsg) throw 'Already Had Sticky Message, Please Delete It First!';

        msg.channel.send({
            embed: {
                description: msg.realContent,
                color: 15051287,
                author: {
                    name: 'Sticky Message',
                    icon_url: 'https://i.ibb.co/7VP0JRs/star.png'
                },
                footer: {
                    text: `📌 Sticky By: ${member.username}#${member.discriminator}`
                }
            }
        });

        sticky.set(`${guild.id}.${channel.id}`, {
            content: msg.realContent,
            creatorID: member.id
        });

    },
    options: {
        description: 'Stick a Message on the Channel',
        usage: '<@Message Content>',
        guildOnly: true,
        argsRequired: true,
        aliases: ['stick'],
        alerts: {
            invalidUsage: 'Please Provide Message to Stick!',
        },
        requirements: {
            bot: ['readMessages', 'sendMessages'],
            permissions: {
                manageMessages: true
            }
        }
    }
}