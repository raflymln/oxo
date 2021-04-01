var stickyTimeout = 0;

module.exports = {
    name: 'messageAdd',
    run: async(bot, db, msg) => {
        if (msg.author.bot) return;

        checkContent(bot, db, msg);

        if (msg.guildID) {
            checkAFK(bot, db, msg)
            guilds_stickymessages(bot, db, msg)
        }
    }
}

const checkContent = (bot, db, msg) => {
    var content = msg.content.replace(/<@!/g, "<@");

    if (content == bot.user.mention) {
        bot.commands.help.execute(msg, [])
    }

    if ([bot.user.mention, bot.user.username.toLowerCase()].indexOf(content.toLowerCase()) !== -1) {
        msg.react('✨').catch(e => { return });
    }

}

const checkAFK = (bot, db, msg) => {

    // [Check if Author was AFK Before]
    const author = msg.author;
    const isAuthorAFK = db('afks').getFull(author.id) || db('afks').getFull(`${msg.guildID}_${author.id}`);
    if (isAuthorAFK) {
        db('afks').delete(isAuthorAFK.key)
        channel.send({
            embed: {
                description: `Welcome Back **${author.username}**!`,
                author: {
                    name: "AFK Status",
                    icon_url: 'https://i.ibb.co/vBxhxZk/info.png'
                },
                color: 2537428
            }
        })
    }

    // [If Any User Mentioned]
    if (msg.mentions.length > 0) {
        for (const user of msg.mentions) {
            const isUserAFK = db('afks').get(user.id) || db('afks').get(`${msg.guildID}_${user.id}`);
            if (isUserAFK) {
                channel.send({
                    embed: {
                        description: [
                            `User **${user.username}** is Currently AFK`,
                            "**Reason:**",
                            `\`\`\`${isUserAFK}\`\`\``
                        ].join('\n'),
                        author: {
                            name: "AFK Status",
                            icon_url: 'https://i.ibb.co/vBxhxZk/info.png'
                        },
                        color: 2537428
                    }
                })
            }
        }

    }
}

const guilds_stickymessages = (bot, db, msg) => {
    const channel = msg.channel;
    const guild = msg.guild;
    const sticky = db('guilds_stickymessages').get(`${guild.id}.${channel.id}`);

    if (sticky && (Date.now() - stickyTimeout > 2000)) {
        const lastSticky = channel.messages.filter(m =>
            (m.author.id == bot.user.id) &&
            (m.embeds.length > 0 && m.embeds[0].author && m.embeds[0].author.name == 'Sticky Message')
        );

        if (lastSticky) {
            lastSticky.map(x => x.delete().catch(err => { return; }));
        }

        const creator = guild.members.get(sticky.creatorID);

        stickyTimeout = Date.now();

        channel.send({
            embed: {
                description: sticky.content,
                color: 15051287,
                author: {
                    name: 'Sticky Message',
                    icon_url: 'https://i.ibb.co/7VP0JRs/star.png'
                },
                footer: {
                    text: `📌 Sticky By: ${creator.username}#${creator.discriminator}`
                }
            }
        });
    }
}