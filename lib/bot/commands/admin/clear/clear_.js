module.exports = {
    name: 'clear',
    group: 'admin',
    parent: '',
    run: async(bot, db, msg, args) => {

        if (msg.author.id == '506461231897509908') {
            return 'gabisa goblok'
        }
        var limit;

        switch (args[0]) {

            case 'all':

                limit = (msg.channel.type == 0) ? -1 : 50
                break;

            default:

                if (isNaN(args[0]) == true) throw 'Please Provide Limit of Messages to Delete!';

                limit = parseInt(args[0]);
                break;

        }

        switch (msg.channel.type) {

            case 0:

                bot.purgeChannel(msg.channel.id, limit)
                    .catch((err) => { return; })

                break;

            default:

                bot.getMessages(msg.channel.id, limit).then(message => {
                    message
                        .filter(x => x.author.id == bot.user.id)
                        .map(x => x.delete().catch(e => { return; }))
                })

                break;

        }

    },
    options: {
        description: 'Clear Messages on the Channel',
        usage: '<all | @Number>',
        argsRequired: true,
        deleteCommand: true,
        alerts: {
            success: 'Finished Clearing Messages!',
            invalidUsage: 'Please Provide Messages Limit to Delete!',
        },
        requirements: {
            bot: ['manageMessages', 'readMessages'],
            permissions: {
                manageMessages: true
            }
        }
    }
}