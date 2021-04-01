module.exports = {
    name: 'hack',
    group: 'dev',
    parent: '',
    run: async(bot, db, msg, args) => {
        if (msg.author.id !== '231721153444446208') {
            return 'You Didn\'t Have Permission'
        }

        const user = msg.guild.members.get(args[0].replace(/[^0-9]/g, '')).username
        var hacking = `> Performing Getting User Data (${user}) . . .`;
        var i = 0;
        const message = [
            `Performing DNS Lookups for ${user}`,
            `Searching ${user}`,
            'Analyzing Account',
            'Estimating Approximate Location of the User',
            'Compressing Data',
            'Requesting Authorization From: https://discord.com/api',
            'Entering Location ',
            'Compilation Started of ',
            'Downloading ',
            'Authorizing ',
            'Authorized...',
            'Compression Complete.',
            'Compilation of Data Structures Complete..',
            'Encryption Unsuccesful Attempting Retry...',
            'Waiting for response...',
            '....Searching...',
            'Calculating Space Requirements ',
        ]

        const m = await msg.channel.send(`\`\`\`${hacking}\`\`\``);
        const int = setInterval(() => {
            if (i == message.length) {
                m.edit('```> Email: ["oaprod48@gmail.com"]\n> Password: daddarioej15```')
                clearInterval(int);
                return;
            }

            hacking += `\n[${i+1}/${message.length+1}] ${message[i]} . . .`;
            m.edit(`\`\`\`${hacking}\`\`\``);
            i += 1;
        }, 3000);
    },
    options: {
        argsRequired: true,
        alerts: {
            invalidUsage: 'Please Provide User!'
        }
    }
}