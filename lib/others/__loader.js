const chokidar = require('chokidar');

module.exports = (bot, db) => {

    music = {}
    util = {}

    const watcher = chokidar.watch(__basedir + '/lib/others', {
        ignored: /^\./,
        persistent: true,
        awaitWriteFinish: true
    });

    watcher.on('add', function(path) {

        const name = path.replace(/^.*[\\\/]/, '').replace('.js', '').toLowerCase();
        if (name == '__loader') return;

        global[name] = require(path)(bot, db);
        console.log(`\x1b[37m%s\x1b[0m`, `> Module [${name}] Registered`);

    });


    watcher.on('change', function(path) {

        const name = path.replace(/^.*[\\\/]/, '').replace('.js', '').toLowerCase();
        if (name == '__loader') return;

        delete require.cache[path]

        global[name] = require(path)(bot, db);
        console.log(`\x1b[37m%s\x1b[0m`, `> Module [${name}] Updated`);

    });

    watcher.on('error', function(error) {
        console.error('Error happened', error);
    })

}