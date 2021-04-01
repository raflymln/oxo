module.exports = {
    name: 'clear',
    group: 'admin',
    parent: 'warn',
    run: async(bot, db, msg, args) => {

        const guild = msg.member.guild;
        const userwarns = db('userwarns');
        var data = userwarns.get(guild.id);

        switch (args[0]) {

            case 'all':
                await userwarns.delete(guild.id);
                break;

            default:
                const userID = args[0].replace(/\D/g, "");
                if (!userID) throw 'Please Specify User Warn to Clear!';

                const userWarns = data.filter(x => x.userID == userID);
                if (!userWarns || (userWarns && userWarns.length == 0)) throw 'The User Specified has No Warns!';

                switch (args[1]) {

                    case 'all':
                        data = data.filter(x => x.userID !== userID);
                        await userwarns.set(guild.id, data);
                        break;

                    default:
                        const indexData = data.findIndex(x => (x.userID == userID) && (x.ID == args[1]));
                        if (indexData === -1) throw 'Cannot Find Desired Warns!';

                        data.splice(indexData, 1);
                        await userwarns.set(guild.id, data);
                        break;

                }
                break;

        }

    },
    options: {
        argsRequired: true,
        guildOnly: true,
        alerts: {
            success: 'Success Deleting Warns!',
            invalidUsage: 'Please Specify All Desired Parameters!'
        },
        requirements: {
            permissions: {
                manageMessages: true
            }
        }
    }
}