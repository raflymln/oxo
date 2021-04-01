const glob = require('glob');

module.exports = {
    name: 'reload',
    group: 'dev',
    parent: '',
    run: async(bot, db, msg, args) => {

        const alert = await msg.channel.send('```Clearing All Cache...```');
        const dev = bot.options.developersID;

        switch (args[0]) {

            case 'all':
                var reloadedCommand = [];
                var reloadedEvents = [];
                const commands = glob.sync(__basedir + "/lib/commands/**/*.js", {});
                const events = glob.sync(__basedir + "/lib/events/**/*.js", {});

                commands.forEach(filepath => {

                    filepath = filepath.replace(/\//g, '\\');
                    delete require.cache[filepath];

                    const c = require(filepath);
                    c.options = Object.assign({ filepath, group: c.group }, c.options)
                    switch (!c.parent) {

                        case true:
                            bot.unregisterCommand(c.name);
                            bot.registerCommand(c.name, async(msg, args) => c.run(bot, msg, args), c.options);
                            reloadedCommand.push(`'${c.name}'`);
                            break;

                        default:
                            bot.commands[c.parent].registerSubcommand(c.name, async(msg, args) => c.run(bot, msg, args), c.options);
                            reloadedCommand.push(`'${c.parent} ${c.name}'`);
                            break;

                    }

                });

                events.forEach(filepath => {

                    filepath = filepath.replace(/\//g, '\\');
                    delete require.cache[filepath];

                    const e = require(filepath);
                    delete bot._events[e.name];

                    bot.on(e.name, (x, y, z, a, b, c) => e.run(bot, x, y, z, a, b, c));
                    reloadedEvents.push(`'${e.name}'`)

                })

                bot.on("messageCreate", bot.onMessageCreate);
                alert.edit([
                    '```ml',
                    `> Reloading Command [${commands.length}]`,
                    '==========================',
                    `${reloadedCommand.join(' | ')}`,
                    '',
                    `> Reloading Events [${events.length}]`,
                    '==========================',
                    `${reloadedEvents.join(' | ')}`,
                    '```'
                ].join('\n'));
                break;


            default:
                var filepath;
                const commandLabel = args.shift().toLowerCase();
                const commandName = bot.commandAliases[commandLabel] || commandLabel;
                const command = bot.commands[commandName];

                if (!command) throw 'Command Not Found!';

                const label = command.subcommandAliases[args[0]] || args[0];
                const subcommand = label ? command.subcommands[label.toLowerCase()] : false;

                if (subcommand) {

                    filepath = subcommand.filepath;
                    command.unregisterSubcommand(subcommand.label);

                } else {

                    filepath = command.filepath;
                    bot.unregisterCommand(command.label)

                }

                delete require.cache[filepath];
                const c = require(filepath);
                c.options = Object.assign({ filepath, group: c.group }, c.options)

                switch (!c.parent) {

                    case true:
                        bot.registerCommand(c.name, async(msg, args) => c.run(bot, msg, args), c.options);
                        break;

                    case false:
                    default:
                        bot.commands[c.parent].registerSubcommand(c.name, async(msg, args) => c.run(bot, msg, args), c.options);
                        break;

                }

                alert.edit('```Command is Now Online Back!```')

        }

        if (args[1] && args[1] !== '--noreact') {
            alert.react('⛔');
            new Eris.ReactionCollector(bot, alert, (m, emoji, member) => (m.id === alert.id) && (dev.includes(member.id)))
                .on("collect", async(m, emoji, member) => alert.delete());
        }

    },
    options: {
        argsRequired: true,
        devOnly: true,
        alerts: {
            invalidUsage: 'Please Provide Commands to Reload!',
            success: 'Commands Reloaded.'
        },
        aliases: ['rel']
    }
}