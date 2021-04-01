module.exports = {
    name: 'troll',
    group: 'dev',
    parent: '',
    run: async(bot, db, msg, args) => {

        if (args.length < 3) throw 'Not Enough Arguments';

        const user = msg.guild.members.get(args[0].replace(/[^0-9]/g, ''));
        if (!user) throw 'Cannot Find that User';

        const vcID = user.voiceState.channelID;
        if (!vcID) throw 'That User was not on Voice Channel!';

        if (!msg.guild.channels.get(args[1].replace(/[^0-9]/g, ''))) throw 'Cannot Find First Channel';
        if (!msg.guild.channels.get(args[2].replace(/[^0-9]/g, ''))) throw 'Cannot Find Second Channel';

        var first_channel = true;
        var int = 0;
        const intrvl = setInterval(() => {
            user.edit({
                channelID: first_channel ? args[1] : args[2]
            })

            first_channel = !first_channel;
            int += 1;

            if (int === 6) {
                clearInterval(intrvl);
            }
        }, 1000);
    },
    options: {
        requirements: {
            userIDs: ['231721153444446208']
        }
    }
}