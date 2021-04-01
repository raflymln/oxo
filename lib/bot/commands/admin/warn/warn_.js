module.exports = {
    name: 'warn',
    group: 'admin',
    parent: '',
    run: async(bot, db, msg, args) => {

        const member = msg.member;
        const guild = member.guild;
        const userID = args[0].replace(/\D/g, "");
        const reason = args.slice(1).join(' ') || 'No Reason Provided.';

        if (!guild.members.get(userID)) throw `No User with ID: ${userID} Found!`;

        await db('userwarns').push(guild.id, [{
            ID: util.generateUID(),
            userID,
            reason,
            moderatorID: member.id,
            timestamp: msg.timestamp
        }]);

        msg.channel.send({
            embed: {
                color: 14700384,
                author: {
                    name: 'Warned',
                    icon_url: "https://i.ibb.co/Yhvbvxc/cancel.png"
                },
                fields: [{
                        "name": "👤 Warned User",
                        "value": `<@${userID}>`
                    },
                    {
                        "name": "⚔ Responsible Moderator",
                        "value": `<@${member.id}>`
                    },
                    {
                        "name": "📜 Reason:",
                        "value": "```cs\n" + reason + "\n```"
                    }
                ]
            }
        })

    },
    options: {
        guildOnly: true,
        argsRequired: true,
        alerts: {
            invalidUsage: 'Please Specify User to Warn!',
        },
        requirements: {
            permissions: {
                manageMessages: true
            }
        }
    }
}