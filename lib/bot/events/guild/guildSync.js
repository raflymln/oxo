const { simpleflake } = require('simpleflakes');

module.exports = {
    name: 'guildSync',
    run: async(bot, db) => {
        bot.guilds.map(guild => {
            const data = db('guildsettings');
            var settings = data.get(guild.id);

            if (settings && !bot.guilds.get(guild.id)) {
                data.delete(guild.id)
            } else {
                if (!settings) settings = {};
                if (!settings.prefix) settings.prefix = bot.commandOptions.prefix;
                if (!settings.token) settings.token = simpleflake().toString(36);
                settings.name = guild.name;

                if (settings.autoVoiceChannels) {
                    settings.autoVoiceChannels.map(channel => {
                        if (!guild.channels.get(channel.id)) {
                            settings.autoVoiceChannels = settings.autoVoiceChannels.filter(x => x.id !== channel.id);
                        }
                    });

                    if (settings.autoVoiceChannels.length === 0) {
                        delete settings.autoVoiceChannels
                    }
                }

                bot.registerGuildPrefix(guild.id, settings.prefix);
                data.set(guild.id, settings);
            }
        })
    }
}