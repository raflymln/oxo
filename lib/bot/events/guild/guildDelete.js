module.exports = {
    name: 'guildDelete',
    run: async(bot, db, ...args) => {
        bot.emit('guildSync');
        userWarns(bot, db, ...args);
        stickyMessage(bot, db, ...args);
        reactionRoles(bot, db, ...args);
    }
}

const userWarns = (bot, db, guild) => {
    const warns = db('userwarns');
    if (warns.get(guild.id)) {
        warns.delete(guild.id);
    }
}

const stickyMessage = (bot, db, guild) => {
    const sticky = db('stickymessages');
    const data = sticky.findOne({ guildID: guild.id });

    if (data) {
        sticky.delete(data.key)
    }
}

const reactionRoles = (bot, db, guild) => {
    const reactionroles = db('reactionroles');
    const data = reactionroles.findOne({
        guildID: guild.id
    });

    if (data) {
        reactionroles.delete(data.key)
    }
}