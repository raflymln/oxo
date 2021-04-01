const translate = require('@vitalets/google-translate-api');
const { auto, af, sq, am, ar, hy, az, eu, be, bn, bs, bg, ca, ceb, ny, co, hr, cs, da, nl, en, eo, et, tl, fi, fr, fy, gl, ka, de, el, gu, ht, ha, haw, he, iw, hi, hmn, hu, is, ig, id, ga, it, ja, jw, kn, kk, km, ko, ku, ky, lo, la, lv, lt, lb, mk, mg, ms, ml, mt, mi, mr, mn, my, ne, no, ps, fa, pl, pt, pa, ro, ru, sm, gd, sr, st, sn, sd, si, sk, sl, so, es, su, sw, sv, tg, ta, te, th, tr, uk, ur, uz, vi, cy, xh, yi, yo, zu } = require("@vitalets/google-translate-api/languages");

module.exports = {
    name: 'translate',
    group: 'utils',
    parent: '',
    run: async(bot, db, msg, args) => {

        if (args.length < 3) throw 'Please Specify All Desired Parameters!';

        const content = args.slice(2).join(' ');
        if (content.split('').length > 1000) throw 'Can\'t Translate Text Above 1000 Letters!';

        const result = await translate(content, {
                from: args[0].toLowerCase(),
                to: args[1].toLowerCase()
            })
            .catch((err) => {
                throw 'An Error Occured!';
            })

        msg.channel.send({
            embed: {
                color: 2537428,
                author: {
                    name: 'Translations',
                    icon_url: 'https://i.ibb.co/XFGZX9V/question.png'
                },
                fields: [{
                        "name": `Original [ __${args[0].toUpperCase()}__ ]`,
                        "value": content.substr(0, 1000)
                    },
                    {
                        "name": `Translated [ __${args[1].toUpperCase()}__ ]`,
                        "value": result.text
                    }
                ]
            }
        })

    },
    options: {
        aliases: ['tr']
    }
}