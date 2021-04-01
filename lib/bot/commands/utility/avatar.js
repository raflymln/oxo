module.exports = {
    name: 'avatar',
    group: 'utils',
    parent: '',
    run: async(bot, db, msg, args) => {

        const member = msg.member;
        const guild = member.guild;

        const user = (args[0]) ? guild.members.get(args[0].replace(/\D/g, "")) : msg.member
        if (!user) throw 'Cannot Find Specified User!';

        msg.channel.send(user.avatarURL.replace('?size=128', '?size=4096'));

    },
    options: {}
}