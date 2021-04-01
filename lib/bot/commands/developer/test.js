const crypto = require('crypto');
const axios = require('axios');
const util = require('util');

module.exports = {
    name: 'test',
    group: 'dev',
    parent: '',
    run: async(bot, db, msg, args) => {

        const apiKey = "a2IprkS19ZTV96yJ0eu5e0Z5OrKlsZRPri7F0Z5h";
        const privateKey = "1O8H5-RAirO-JamQv-f0bQk-9HaXq";

        const merchant_code = "T1970";

        const amount = 30000;
        const expiry = parseInt(Math.floor(new Date() / 1000) + (24 * 60 * 60));
        const signature = crypto.createHmac('sha256', privateKey).update(merchant_code + amount).digest('hex');

        const payload = {
            'method': 'QRIS',
            'amount': amount,
            'customer_name': 'Mystique',
            'customer_email': 'mraflymaulana@gmail.com',
            'customer_phone': '081806769563',
            'order_items': [{
                'sku': 'PAYPAL_BAL',
                'name': 'Paypal Balance',
                'price': amount,
                'quantity': 1
            }],
            'callback_url': 'https://webhook.site/80827a4d-cbc8-4629-88aa-93de4d0dc9a4',
            'expired_time': expiry,
            'signature': signature
        }

        axios.post('https://payment.tripay.co.id/api/transaction/create', payload, {
                headers: {
                    'Authorization': 'Bearer ' + apiKey
                }
            })
            .then((res) => {
                msg.channel.send("```json\n" + util.inspect(res.data.data) + "```");
            })
            .catch((error) => {
                console.error(error)
            });

    },
    options: {
        guildOnly: true,
        devOnly: true
    }
}