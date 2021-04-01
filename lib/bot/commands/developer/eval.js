const Eris = require("@raflymln/eris");
const fs = require('fs');
const { simpleflake } = require('simpleflakes');
const md5 = require('md5');

module.exports = {
    name: 'eval',
    group: 'dev',
    parent: '',
    run: async(bot, db, msg, args) => {

        var code, output;
        const dev = bot.options.developersID;

        try {

            if (args[0] == '--await') {

                code = args.slice(1).join(" ")
                output = await eval(code);

            } else {

                code = args.join(" ")
                output = eval(code);

            }

            output = util.inspect(output);
            if (output.length > 2000) {

                const filename = `Eval-${msg.timestamp}.txt`;

                try {
                    fs.writeFileSync(__basedir + `/data/logs/${filename}`, output)
                } catch (err) {
                    throw err
                };

                output = `Exceeds Max Limit, Written to Logs ["${filename}"]!`

            }

        } catch (err) {
            output = err
        }

        const result = await bot.send(msg, `\`\`\`js\n${output}\`\`\``);
        result.react('⛔')

        new Eris.ReactionCollector(bot, result, (m, emoji, member) => (m.id === result.id) && (dev.includes(member.id)), {
                time: 1000 * 10,
            })
            .on("collect", async(m, emoji, member) => result.delete());

    },
    options: {
        argsRequired: true,
        alerts: {
            invalidUsage: 'Please Provide Codes to be Evaluated!'
        },
        aliases: ['ev'],
        devOnly: true
    }
}