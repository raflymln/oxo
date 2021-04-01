module.exports = {
    name: 'dashboard',
    group: 'admin',
    parent: '',
    run: async(bot, db, msg, args) => {

        const member = msg.member;
        const guild = msg.member.guild;

        const data = read('guilds/settings');
        const userDM = await bot.getDMChannel(member.id);
        const link = `http://${config.web.baseURL}/dashboard/${guild.id}/${data[guild.id].token}`;

        bot.send(userDM.id, {
            embed: {
                color: 3325350,
                description: `Here's a Link to **${guild.name}** Dashboard:\n${link}`,
                author: {
                    name: 'Guild Dashboard',
                    icon_url: "https://i.ibb.co/x3W90Rm/settings.png"
                }
            }
        });

    },
    options: {
        aliases: ['dash'],
        guildOnly: true,
        alerts: {
            success: 'Guild Dashboard Link Has Sent to Your DM!'
        },
        requirements: {
            permissions: {
                administrator: true
            }
        }
    }
}