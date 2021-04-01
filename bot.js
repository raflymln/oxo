require('dotenv').config()
__basedir = __dirname;
config = require('./config');

const storage = require('@raflymln/fbs')();
read = storage.read;
write = storage.write;

const Eris = require("@raflymln/eris");
const bot = new Eris.CommandClient(process.env.DISCORD_BOT_TOKEN, config.bot.options, config.bot.commandOptions);

var Mongochrome = require('@raflymln/mongochrome');
const db = Mongochrome.Connect(process.env.MONGODB_URL, config.mongoDB.connectOptions, config.mongoDB.options);

require('./lib/__loader')(bot, db)