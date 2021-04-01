const axios = require('axios');
const util = require('util');

module.exports = {
    name: 't2',
    group: 'dev',
    parent: '',
    run: async(bot, db, msg, args) => {

        const res = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fcontabo-status.com%2Frss');
        // return "```" + JSON.parse(res.data) + "```"

        msg.channel.send("```\n" + util.inspect(res.data).substr(0, 1000) + "```")
    },
    options: {
        requirements: {
            userIDs: ['231721153444446208']
        }
    }
}