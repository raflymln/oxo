module.exports = {
    name: 'autovoice',
    group: 'admin',
    parent: '',
    run: async(bot, db, msg, args) => {
        const guild = msg.channel.guild;
        const settings = db('guilds_autovoices');
        const autoVoiceID = settings.get(`${guild.id}.creatorID`);

        if (!autoVoiceID) {
            var channel = (args[0]) ? guild.channels.get(args[0]) : false;

            if (!channel || (channel && channel.type !== 2)) {
                channel = await guild.createChannel('Join Here to Create Voice Channel!', 2);
            }

            settings.set(`${guild.id}.creatorID`, channel.id);
        } else {
            const channel = guild.channels.get(autoVoiceID);
            throw `You already had that channel [${channel.name}]`;
        }

    },
    options: {
        guildOnly: true,
        requirements: {
            permissions: {
                manageChannels: true
            },
            bot: ['manageChannels']
        },
        alerts: {
            success: "Success Creating Auto Voice Channel!"
        }
    }
}