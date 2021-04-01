module.exports = {
    name: 'bubblewrap',
    group: 'fun',
    parent: '',
    run: async(bot, db, msg, args) => {

        var pop = []

        for (var i = 0; i < 5; i++) {
            pop.push(('||pop|| ').repeat(5))
        }

        msg.channel.send({
            embed: {
                color: 16768601,
                description: pop.join('\n')
            }
        });

    },
    options: {
        aliases: ['pop']
    }
}