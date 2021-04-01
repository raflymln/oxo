module.exports = {
    name: 'ready',
    run: async(bot, db) => {
        log(bot, db);
        bot.emit('guildSync');
    }
}

const log = (bot, db) => {
    const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

    bot.send(config.bot.options.logChannelID, {
        embed: {
            color: 3325350,
            author: {
                name: `Bot Ready!`,
                icon_url: bot.user.avatarURL
            },
            description: [
                '```ml',
                `[ ${date} ]`,
                '```'
            ].join('\n')
        }
    });
}