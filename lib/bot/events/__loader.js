const chokidar = require('chokidar');

module.exports = (bot, db) => {

    const process = {}
    const alert = (name, alert) => {
        console.log(`\x1b[33m%s\x1b[0m`, `> Event [${name}] ${alert}`);
    }

    const watcher = chokidar.watch(__basedir + '/lib/bot/events', {
        ignored: /^\./,
        persistent: true,
        awaitWriteFinish: true
    });


    watcher.on('add', function(path) {

        if (!path.endsWith('.js')) return;

        const e = require(path);
        if (!e.name || !e.run) return;

        process[path] = (...args) => e.run(bot, db, ...args);

        bot.on(e.name, (...args) => process[path](...args));
        alert(e.name, 'Registered')

    });


    watcher.on('change', function(path) {

        if (!path.endsWith('.js')) return;
        delete require.cache[path];

        const e = require(path);
        if (!e.name || !e.run) return;

        if (!bot._events[e.name]) {
            watcher.emit('add', path);
            return;
        }

        process[path] = (...args) => e.run(bot, db, ...args);
        alert(e.name, 'Updated')

    });


    watcher.on('unlink', function(path) {

        if (!path.endsWith('.js')) return;

        const e = require.cache[path].exports
        delete bot._events[e.name];

        alert(e.name, 'Removed');
        delete process[path];
        delete require.cache[path];

    });


    watcher.on('error', function(error) {
        console.error('Error happened', error);
    })

}