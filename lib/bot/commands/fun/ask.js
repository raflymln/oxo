const axios = require('axios');

module.exports = {
    name: 'ask',
    group: 'fun',
    parent: '',
    run: async(bot, db, msg, args) => {

        const question = encodeURIComponent(args.join(' ').trim());
        const response = await axios.get(`http://bruhapi.xyz/cb/${question}`);

        msg.channel.send({
            embed: {
                color: 16768601,
                description: response.data.res
            }
        })

    },
    options: {
        enabled: false,
        argsRequired: true,
        alerts: {
            invalidUsage: 'You Wanna Ask Me, but You Didn\'t Specified the Question...'
        }
    }
}