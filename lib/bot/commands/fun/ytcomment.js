module.exports = {
    name: 'ytc',
    group: 'fun',
    parent: '',
    run: async(bot, db, msg, args) => {

        const member = msg.member;
        const draw = Utils.canvas.draw;
        const url = `https://some-random-api.ml/canvas/youtube-comment?avatar=${member.avatarURL}&username=${member.username}&comment=${args.join(' ')}`;

        msg.channel.send({}, {
            file: await draw(url),
            name: `YT_COMMENT_BY_${member.username}.png`
        });

    },
    options: {}
}