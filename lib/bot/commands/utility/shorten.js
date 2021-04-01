module.exports = {
    name: 'shorten',
    group: 'utils',
    parent: '',
    run: async(bot, db, msg, args) => {

        if (!Utils.isValidURL(args[0])) throw 'Not a Valid URL!';

        const data = read('others/urlshortener');
        var uniqID;

        do { uniqID = Utils.generateUID() } while (data[uniqID] !== undefined);

        data[uniqID] = {
            url: args[0],
            hashID: uniqID,
            created: {
                by: msg.member.id,
                at: new Date(Date.now()).toLocaleString()
            }
        }

        msg.channel.send({
            "embed": {
                "fields": [{
                        "name": "Original:",
                        "value": ">>> " + args[0]
                    },
                    {
                        "name": "Shortened:",
                        "value": ">>> " + `http://${settings.baseURL}/go/${uniqID}`
                    }
                ],
                "color": 2537428,
                "author": {
                    "name": "URL Shortener",
                    "icon_url": "https://i.ibb.co/RzW1VL4/link.png"
                }
            }
        });

        write('others/urlshortener', data)

    },
    options: {
        argsRequired: true,
        alerts: {
            invalidUsage: 'Please Provide URL to Be Shortened!'
        }
    }
}