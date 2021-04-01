module.exports = {
    name: 'rolldice',
    group: 'fun',
    parent: '',
    run: async(bot, db, msg, args) => {

        const diceval = (args[0] && !isNaN(args[0])) ? parseInt(args[0]) : 12;
        const result = Math.floor(Math.random() * diceval) + 1;
        const embed = {
            description: 'Rolling . . .',
            color: 2537428,
            author: {
                name: 'Dice Roll',
                icon_url: "https://i.ibb.co/XFGZX9V/question.png"
            }
        }
        const ans = await msg.channel.send({ embed });

        embed.description = `The Dice Value is: **${result}**`;
        setTimeout(async() => ans.edit({ embed }).catch(e => { return; }), 1000);

    },
    options: {
        aliases: ['roll']
    }
}