module.exports = {
    name: 'by',
    group: 'admin',
    parent: 'clear',
    run: async(bot, db, msg, args) => {

        if (msg.author.id == '506461231897509908') {
            return 'gabisa goblok'
        }

        const limit = (args[1] && !!isNaN(args[1])) ? (parseInt(args[1]) + 1) : 50;
        var filters;

        switch (args[0]) {

            case 'oxo':

                filters = x => x.author.id == bot.user.id;
                break;

            case 'bot':

                filters = x => x.author.bot;
                break;

            case 'me':

                filters = x => x.author.id == msg.member.id;
                break;

            default:

                const userID = args[0].replace(/\D/g, "");
                if (isNaN(userID) == true) throw 'Please Provide User ID for Messages to Delete!';

                filters = x => x.author.id == userID
                break;

        }

        msg.channel
            .getMessages(limit)
            .then(m => m.filter(x => filters(x)).map(x => x.id))
            .then(messages => bot.deleteMessages(msg.channel.id, messages).catch((err) => { return; }));

    },
    options: {
        description: 'Clear Messages on the Channel from Specified User',
        usage: '<oxo | bot | me | @UserID> <@Value (Optional)>',
        guildOnly: true,
        argsRequired: true,
        deleteCommand: true,
        alerts: {
            success: 'Finished Clearing Messages!',
            invalidUsage: 'Please Provide the Message Author!',
        },
        requirements: {
            bot: ['manageMessages', 'readMessages'],
            permissions: {
                manageMessages: true
            }
        }
    }
}