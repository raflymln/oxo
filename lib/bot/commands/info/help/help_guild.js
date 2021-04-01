module.exports = {
    name: 'custom',
    group: 'info',
    parent: 'help',
    run: async(bot, db, msg, args) => {

        const guild = msg.member.guild;
        const cc = read('guilds/customcommands')[guild.id] || {};
        var list = []

        switch (Object.keys(cc).length) {

            case 0:
                list.push('No Custom Command Available for This Guild.')
                break;

            default:
                Object.keys(cc).forEach((item, index) => list.push(`${index+1}) **${msg.prefix} ${item}**`));
                break;

        }

        msg.channel.send({
            embed: {
                description: list.join('\n'),
                color: 2537428,
                author: {
                    name: 'Guild Command List',
                    icon_url: 'https://i.ibb.co/vBxhxZk/info.png'
                }
            }
        })

    },
    options: {
        guildOnly: true,
        aliases: ['guild', 'g']
    }
}