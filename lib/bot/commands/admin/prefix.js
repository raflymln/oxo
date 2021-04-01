module.exports = {
    name: 'prefix',
    group: 'admin',
    parent: '',
    run: async(bot, db, msg, args) => {

        var prefix;
        const guild = msg.member.guild;

        switch (args[0]) {

            case 'default':
                prefix = bot.commandOptions.prefix;
                break;

            default:
                if (msg.mentions.length > 0) throw 'Prefix Cannot Contains User Mentions!';
                if (msg.channelMentions.length > 0) throw 'Prefix Cannot Contains Channel Mentions!';
                if (msg.roleMentions.length > 0) throw 'Prefix Cannot Contains Role Mentions!';
                if (msg.mentionEveryone) throw 'Prefix Cannot Contains Mentions!';

                prefix = args
                break;

        }

        bot.registerGuildPrefix(guild.id, prefix);
        db('guildsettings').set(`${guild.id}.prefix`, prefix);

    },
    options: {
        aliases: ['pref'],
        guildOnly: true,
        alerts: {
            success: 'Success Changing Bot Prefix!'
        },
        requirements: {
            permissions: {
                administrator: true
            }
        }
    }
}