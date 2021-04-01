const chokidar = require('chokidar');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = (bot, db, app) => {

    const process = {}
    const watcher = chokidar.watch(__basedir + '/lib/web/static', {
        ignored: /^\./,
        persistent: true,
        awaitWriteFinish: true
    });


    watcher.on('add', function(path) {

        if (!path.endsWith('.js')) return;
        const w = require(path);
        if (!w.route || !w.method || !w.run) return;

        process[w.route] = (req, res) => w.run(bot, db, req, res);

        app[w.method](w.route, (req, res) => process[w.route](req, res));
        console.log(`\x1b[35m%s\x1b[0m`, `> Websocket [${w.method.toUpperCase()} ${w.route}] Registered`);

    });


    watcher.on('change', function(path) {

        if (!path.endsWith('.js')) return;
        delete require.cache[path];
        const w = require(path);
        if (!w.route || !w.method || !w.run) return;

        process[w.route] = (req, res) => w.run(bot, db, req, res);
        console.log(`\x1b[35m%s\x1b[0m`, `> Websocket [${w.method.toUpperCase()} ${w.route}] Updated`);

    });


    watcher.on('unlink', function(path) {

        if (!path.endsWith('.js')) return;
        const w = require.cache[path].exports;
        process[w.route] = (req, res) => res.send('Not Found');
        console.log(`\x1b[35m%s\x1b[0m`, `> Websocket [${w.method.toUpperCase()} ${w.route}] Removed`);

    });


    watcher.on('error', function(error) {
        console.error('Error happened', error);
    })


    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__basedir, '/assets')));

}