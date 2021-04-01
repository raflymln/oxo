module.exports = {
    name: 'math',
    group: 'utils',
    parent: '',
    run: async(bot, db, msg, args) => {

        try { var answer = eval(args.join(" ")); } catch (err) { throw 'Cannot Count That!'; }

        msg.channel.send({
            "embed": {
                "description": "> The Answer is: `" + answer + "`",
                "color": 2537428,
                "author": {
                    "name": "Math",
                    "icon_url": "https://i.ibb.co/XFGZX9V/question.png"
                }
            }
        });

    },
    options: {
        argsRequired: true,
        alerts: {
            invalidUsage: 'Please Provide Math Question!'
        },
        aliases: ["count"]
    }
}