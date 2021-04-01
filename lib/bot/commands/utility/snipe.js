module.exports = {
    name: 'snipe',
    group: 'utils',
    parent: '',
    run: async(bot, db, msg, args) => {

        const channelID = msg.channelMentions > 0 ? msg.channelMentions[0] : msg.channel.id
        const lm = lastMessage[channelID];
        if (!lm) throw 'No Any Deleted Message!'

        var content = {
            description: lm.content || '[No Message Content]',
            color: 16768601,
            author: {
                name: `${lm.author.username}#${lm.author.discriminator}`,
                icon_url: `https://cdn.discordapp.com/avatars/${lm.author.id}/${lm.author.avatar}.jpg?size=128`
            },
            timestamp: new Date(lm.timestamp)
        };

        if (lm.attachments && lm.attachments.length > 0) {
            content.image = { url: lm.attachments[0].proxy_url }
        }

        msg.channel.send({ embed: content })
        if (lm.embeds && lm.embeds[0]) {
            msg.channel.send({ embed: lm.embeds[0] })
        }

    },
    options: {}
}