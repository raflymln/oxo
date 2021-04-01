module.exports = {
    name: 'guildMemberAdd',
    run: async(bot, db, guild, member) => {

        var data = read('guilds/settings'),
            guildData = data[guild.id];

        if (guildData) {

            if (guildData.join_channel && guild.channels.get(guildData.join_channel)) {

                if (guildData.join_message)
                    bot.send(guildData.join_channel, eval('`' + guildData.join_message + '`'))

                if (guildData.join_card) {

                    bot.send(guildData.join_channel, {}, {
                        name: `Hello_${member.username}.png`,
                        file: await util.renderCard(member, guildData.join_card)
                    })

                }

            }

            if (guildData.join_pm) {

                var userDM = await bot.getDMChannel(member.id);
                bot.send(userDM.id, eval('`' + guildData.join_pm + '`'));

            }

            if (guildData.auto_role) {

                member
                    .edit({ roles: guildData.auto_role })
                    .catch((err) => { return; });

            }

        }

    }
}