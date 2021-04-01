module.exports = {
    name: 'guildMemberRemove',
    run: async(bot, db, guild, member) => {

        var data = read('guilds/settings'),
            guildData = data[guild.id];

        if (guildData) {

            if (guildData.leave_channel && guild.channels.get(guildData.leave_channel)) {

                if (guildData.leave_message)
                    bot.send(guildData.leave_channel, eval('`' + guildData.leave_message + '`'))

                if (guildData.leave_card) {

                    bot.send(guildData.leave_channel, {}, {
                        name: `Bye_${member.username}.png`,
                        file: await util.renderCard(member, guildData.leave_card)
                    })

                }

            }

            if (guildData.leave_pm) {

                var userDM = await bot.getDMChannel(member.id);
                bot.send(userDM.id, eval('`' + guildData.leave_pm + '`'))

            }

        }

    }
}