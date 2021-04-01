module.exports = {
    name: 'disconnect',
    run: async(bot, db) => {
        log(bot, db)
    }
}

const log = (bot, db) => {
    const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });

    bot.send(config.bot.options.logChannelID, {
        embed: {
            color: 14700384,
            author: {
                name: `Bot Disconnecting!`,
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