const chokidar = require('chokidar');

module.exports = (bot, db) => {

    const alert = (command, alert) => {
        const color = (!command.parent) ? 1 : 0
        const type = (!command.parent) ? 'Command' : 'Sub Command'
        const name = (!command.parent) ? command.name : `${command.parent} ${command.name}`;

        console.log(`\x1b[${color}m\x1b[36m%s\x1b[0m`, `> ${type} [${name}] ${alert}`);
    }
    const watcher = chokidar.watch(__basedir + '/lib/bot/commands', {
        ignored: /^\./,
        persistent: true
    });


    watcher.on('add', function(path, alerts = true) {
        if (!path.endsWith('.js')) return;

        const c = require(path);
        if (!c.name || !c.run || !c.group || !c.options) return;

        c.options.group = c.group;
        if (!c.parent) {
            bot.registerCommand(c.name, async(msg, args) => c.run(bot, db, msg, args), c.options);
        } else {
            bot.commands[c.parent].registerSubcommand(c.name, async(msg, args) => c.run(bot, db, msg, args), c.options);
        }

        if (alerts) alert(c, 'Registered')
    });


    watcher.on('change', function(path) {
        if (!path.endsWith('.js')) return;
        delete require.cache[path];

        const c = require(path);
        if (!c.name || !c.run || !c.group || !c.options) return;

        if (!c.parent) {
            if (!bot.commands[c.name]) {
                watcher.emit('add', path);
                return;
            }
            delete bot.commands[c.name];
        } else {
            if (!bot.commands[c.parent] || !bot.commands[c.parent].subcommands[c.name]) {
                watcher.emit('add', path);
                return;
            }
            delete bot.commands[c.parent].subcommands[c.name];
        }

        watcher.emit('add', path, false);
        alert(c, 'Updated');
    })


    watcher.on('unlink', function(path) {

        if (!path.endsWith('.js')) return;
        if (!require.cache[path]) return;

        const c = require.cache[path].exports;
        if (!c.name || !c.run || !c.group || !c.options) return;

        if (!c.parent) {
            bot.unregisterCommand(c.name);
        } else {
            bot.commands[c.parent].unregisterSubcommand(c.name);
        }

        alert(c, 'Removed');
        delete require.cache[path];

    });


    watcher.on('error', function(error) {
        console.error('Error happened', error);
    })

}