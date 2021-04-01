const Canvas = require('canvas');
const readline = require('readline');

const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

module.exports = async(bot, db, reloadDB) => {

    console.log('\x1b[1m\x1b[42m\x1b[37m%s\x1b[0m', " Starting Process! ");

    // [Fonts]
    config.canvas.fonts.forEach((family) => Canvas.registerFont(__basedir + `/assets/fonts/${family.toLowerCase()}.ttf`, { family }));

    // [BOT]
    require('./bot/commands/__loader')(bot, db)
    require('./bot/events/__loader')(bot, db)

    // [WEB]
    require('./web/static/__loader')(bot, db, app)
    require('./web/events/__loader')(bot, db, io)

    // [OTHERS]
    require('./others/__loader')(bot, db)

    // [Console Event]
    // readline.emitKeypressEvents(process.stdin);
    // process.stdin.setRawMode(true);
    // process.stdin.on('keypress', (str, key) => {
    //     if (key.ctrl) {
    //         switch (key.name) {
    //             case 'c':
    //                 console.log('\x1b[41m\x1b[37m%s\x1b[0m', ` [ SIGINT RECEIVED ] `);
    //                 if (bot.ready) bot.emit('disconnect');
    //                 setTimeout(() => process.exit(), 1000);
    //                 break;

    //             case 'l':
    //                 console.clear();
    //                 break;
    //         }
    //     }
    // })

    // [CONNECTION]
    bot.connect();
    server.listen(8080);

}