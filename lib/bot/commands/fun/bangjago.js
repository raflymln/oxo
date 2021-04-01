module.exports = {
    name: 'bangjago',
    group: 'fun',
    parent: '',
    run: async(bot, db, msg, args) => {

        const message = await msg.channel.getMessage(args[0]).catch(e => {
            throw 'No Message Found!'
        });

        const emojiList = ['🙏🏻', '🆎', '🅰', '🆖', '🇯', '🇦', '🇬', '🇴'];
        emojiList.map(emoji => {
            message.addReaction(emoji).catch(e => false)
        });
    },
    options: {
        argsRequired: true,
        alerts: {
            invalidUsage: 'Please Provide Message ID!'
        },
        deleteCommand: true
    }
}