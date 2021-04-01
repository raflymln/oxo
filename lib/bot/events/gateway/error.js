module.exports = {
    name: 'error',
    run: async(bot, db, ...args) => {
        log(bot, db, ...args)
    }
}

const log = (bot, db, err, id) => {
    console.error(err)
    bot.send(config.bot.options.logChannelID, {
        "embed": {
            "description": "```" + err + "```",
            "color": 14700384,
            "author": {
                "name": "OxO Received an Error!",
                "icon_url": bot.user.avatarURL
            }
        }
    });
}