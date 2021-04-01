module.exports = {
    name: 'mock',
    group: 'fun',
    parent: '',
    run: async(bot, db, msg, args) => {

        const command = msg.command.label;
        const prefix = msg.prefix;
        var content;

        if (!isNaN(args[0])) msg = await msg.channel.getMessage(args[0]).catch(e => {
            throw 'No Message Found!'
        });

        if (msg.content !== '') {
            content = msg.content
        } else if (msg.embeds.length > 0 && msg.embeds[0].description !== '') {
            content = msg.embeds[0].description
        } else {
            throw 'No Message Content Found!'
        }

        content = content.replace(prefix, '').replace(command, '').trim().toLowerCase().split('');

        for (const text in content) {
            const result = (Math.floor(Math.random() * 2) == 1) ? true : false;
            if (result) content[text] = content[text].toUpperCase()
        }

        msg.channel.send(content.join(''));
    },
    options: {
        argsRequired: true
    }
}