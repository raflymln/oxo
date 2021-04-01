const chokidar = require('chokidar');

module.exports = (bot, db, io) => {
    const socketusers = {}
    const process = {}
    const alert = (socket, alert) => {
        console.log(`\x1b[31m%s\x1b[0m`, `> Web Events [${socket.name}] ${alert}`);
    }
    const watcher = chokidar.watch(__basedir + '/lib/web/events', {
        ignored: /^\./,
        persistent: true,
        awaitWriteFinish: true
    });


    watcher.on('add', function(path) {

        if (!path.endsWith('.js')) return;

        const w = require(path);
        if (!w.name || !w.run) return;

        process[w.name] = async(socket, ...args) => w.run(bot, db, socket, ...args);
        alert(w, 'Registered')

    });


    watcher.on('change', function(path) {

        if (!path.endsWith('.js')) return;
        delete require.cache[path];

        const w = require(path);
        if (!w.name || !w.run) return;

        process[w.name] = async(socket, ...args) => w.run(bot, db, socket, ...args);
        alert(w, 'Updated')

    });


    watcher.on('unlink', function(path) {

        if (!path.endsWith('.js')) return;
        const w = require.cache[path].exports;

        delete process[w.name];
        alert(w, 'Removed');
        delete require.cache[path]

    });


    watcher.on('error', function(error) {
        console.error('Error happened', error);
    })

    io.on('connect', async socket => {

        const clientIP = socket.request.connection.remoteAddress;
        if (!socketusers[clientIP]) {
            socketusers[clientIP] = {
                id: socket.id,
                ip: clientIP
            }
        }

        socket.on('userList', () => console.log(socketusers))
        socket.on('INIT', (type, ...args) => process[type](socket, ...args))

    })

}