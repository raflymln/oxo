module.exports = {
    name: 'flipcoin',
    group: 'fun',
    parent: '',
    run: async(bot, db, msg, args) => {

        const result = (Math.floor(Math.random() * 2) == 1) ? "Tails" : "Heads";
        const embed = {
            description: 'Flipping . . .',
            color: 2537428,
            author: {
                name: 'Coin Flip',
                icon_url: "https://i.ibb.co/XFGZX9V/question.png"
            }
        }
        const ans = await msg.channel.send({ embed });

        embed.description = `The Coin Side is: **${result}**`;
        setTimeout(async() => ans.edit({ embed }).catch(e => { return; }), 1000);

    },
    options: {
        aliases: ["flip"]
    }
}