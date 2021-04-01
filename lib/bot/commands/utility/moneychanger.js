module.exports = {
    name: 'moneychanger',
    group: 'utils',
    parent: '',
    run: async(bot, db, msg, args) => {

        if (args.length <= 3) throw 'Please Specify All Parameters';
        if (isNaN(args[2]) == true) throw 'Please Specify Numbers of Money to Convert!';

        const data = read('data/info.json').exchange_rates;
        const from = args[0].toUpperCase();
        const to = args[1].toUpperCase();
        const amount = parseInt(args[2]);

        if (!data[from] || !data[to]) throw 'Cannot Find That Currency!';
        const result = Math.floor(eval(`${data[to]}/${data[from]} * ${amount}`) * 1000) / 1000

        msg.channel.send({
            "embed": {
                "color": 2537428,
                "author": {
                    "name": "Currency Converter",
                    "icon_url": "https://i.ibb.co/vBxhxZk/info.png"
                },
                "fields": [{
                        "name": `From ${from}`,
                        "value": `${from} ${amount.toLocaleString()}`
                    },
                    {
                        "name": `To ${to}`,
                        "value": `${to} ${result.toLocaleString()}`
                    }
                ],
                "footer": {
                    "text": "Rates Provided By ECB & ExchangeRatesAPI",
                    "icon_url": "https://s.marketwatch.com/public/resources/images/MW-HH276_ecb_NS_20190410023901.png"
                }
            }
        })

    },
    options: {
        aliases: ['mcc']
    }
}