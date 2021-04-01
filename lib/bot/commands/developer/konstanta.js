module.exports = {
    name: 'k',
    group: 'dev',
    parent: '',
    run: async(bot, db, msg, args) => {

        msg.channel.send({
            embed: {
                title: args[0],
                description: `> Meeting Recording:\n${args[1]}\n\n> Access Passcode: \n**${args[2]}**`,
                author: args.slice(3).join(' '),
                thumbnail: { url: "https://i.ibb.co/zFdLcHC/logo-600px-300x300.png" },
                color: 16316664
            }
        })

    },
    options: {
        requirements: {
            userIDs: ['231721153444446208']
        }
    }
}