module.exports = {
    name: 'guildCreate',
    run: async(bot, db, ...args) => {
        log(bot, db, ...args);
        bot.emit('guildSync');
    }
}

const log = (bot, db, guild) => {
    bot.send(config.bot.options.logChannelID, {
        "embed": {
            "color": 3325350,
            "author": {
                "name": `Added To Guild: ${guild.name}`,
                "icon_url": guild.iconURL
            }
        }
    });
}