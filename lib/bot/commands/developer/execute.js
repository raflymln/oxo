module.exports = {
    name: 'execute',
    group: 'dev',
    parent: '',
    run: async(bot, db, msg, args) => {

        const commandLabel = args.shift().toLowerCase();
        const commandName = bot.commandAliases[commandLabel] || commandLabel;
        const command = bot.commands[commandName];

        if (!command) throw 'Command Not Found!';

        const label = command.subcommandAliases[args[0]] || args[0];
        const subcommand = label ? command.subcommands[label.toLowerCase()] : false;

        if (subcommand) {

            subcommand.execute(msg, args.slice(1))

        } else {

            command.execute(msg, args)

        }

    },
    options: {
        argsRequired: true,
        devOnly: true,
        alerts: {
            invalidUsage: 'Please Provide Commands to Executed!',
            success: 'Commands Executed.'
        },
        aliases: ['ex']
    }
}