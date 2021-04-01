lastMessage = new Object;

module.exports = {
    name: 'messageDelete',
    run: async(bot, db, msg) => {
        lastMessage[msg.channel.id] = msg

        if (msg.guildID) {
            guilds_reactionroles(bot, db, msg)
        }
    }
}

const guilds_reactionroles = (bot, db, msg) => {
    const reactionroles = db('guilds_reactionroles');

    if (reactionroles.get(`${msg.guildID}.${msg.id}`)) {
        reactionroles.delete(`${msg.guildID}.${msg.id}`)
    }
}