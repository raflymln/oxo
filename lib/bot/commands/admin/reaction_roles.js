module.exports = {
    name: 'reactionroles',
    group: 'admin',
    parent: '',
    run: async(bot, db, msg, args) => {

        if (msg.roleMentions.length === 0) throw 'Please Mention a Roles for Reaction Message!';
        if (msg.roleMentions.length > 10) throw 'Cannot Add More Than 10 Roles!';

        var roles = [];
        const m = await msg.channel.send({ embed: { description: 'Please Wait...' } })

        msg.roleMentions.map((role, i) => {
            const emoji = util.toEmoji(i + 1);
            roles.push(`${emoji} | <@&${role}>`);
            m.react(emoji);
        });

        m.edit({
            embed: {
                description: `Please React to This Message to Get This Roles:\n${roles.join('\n')}`,
                color: 3325350,
                author: {
                    name: 'Reaction Roles',
                    icon_url: 'https://i.ibb.co/1rv8WH5/medal.png'
                }
            }
        })

        db('guilds_reactionroles').set(`${msg.guild.id}.${m.id}`, {
            roles: msg.roleMentions,
            channelID: msg.channel.id
        });

    },
    options: {
        aliases: ['rr'],
        guildOnly: true,
        requirements: {
            permissions: {
                administrator: true
            }
        }
    }
}