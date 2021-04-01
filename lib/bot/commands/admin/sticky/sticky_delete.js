module.exports = {
    name: 'stop',
    group: 'admin',
    parent: 'sticky',
    run: async(bot, db, msg, args) => {

        const guild = msg.guild;
        const channel = msg.channel;

        const sticky = db('guilds_stickymessages');
        const stickymsg = sticky.get(`${guild.id}.${channel.id}`);
        if (!stickymsg) throw 'No Available Sticky Message to Delete!';

        setTimeout(() => {
            const lastSticky = msg.channel.messages.filter(m => (m.author.id == bot.user.id) &&
                (m.embeds.length > 0 && m.embeds[0].author && m.embeds[0].author.name == 'Sticky Message'));

            if (lastSticky) lastSticky.map(x => x.delete().catch(err => { return; }));
        }, 1000)

        sticky.delete(`${guild.id}.${channel.id}`)

    },
    options: {
        description: 'Delete Sticky Message on the Channel',
        usage: '',
        guildOnly: true,
        alerts: {
            success: 'Sticky Message Stopped!'
        },
        requirements: {
            bot: ['readMessages', 'sendMessages'],
            permissions: {
                manageMessages: true
            }
        }
    }
}