module.exports = {
    name: 'vote',
    group: 'utils',
    parent: '',
    run: async(bot, db, msg, args) => {

        const vote = { collected: {}, result: [] };
        const time = isNaN(args[0]) ? 60 : parseInt(args[0]);
        const content = isNaN(args[0]) ? args.join(' ') : args.slice(1).join(' ');

        // if (time > 60) throw 'Cannot Set Voting Time More That 60 Seconds!';

        const embed = {
            color: 2537428,
            description: `<@${msg.member.id}>: ${content}`,
            author: {
                name: `Voting (${time} Seconds)`,
                icon_url: 'https://i.ibb.co/XS3rHhQ/checked-1.png'
            },
            footer: {
                text: "💡 Vote Your Answer by Reacting to Emoji Below!"
            }
        }

        const votePrompt = await msg.channel.send({ embed });
        votePrompt.react("✅");
        votePrompt.react("⛔");

        const filter = (m, emoji, member) => (m.id === votePrompt.id) && !member.user.bot;
        const collector = new Eris.ReactionCollector(bot, votePrompt, filter, { time: 1000 * time });

        collector.on("collect", async(m, emoji, member) => {

            if (!vote.collected[emoji.name]) vote.collected[emoji.name] = 0
            vote.collected[emoji.name] += 1

        });

        collector.on('end', collected => {

            Object.keys(vote.collected).forEach(i => vote.result.push(`${i} → **${vote.collected[i]}** Vote`))
            if (vote.result.length === 0) vote.result.push('No User Voted!')

            delete embed.footer;
            embed.author = {
                name: "Voting Results",
                icon_url: "https://i.ibb.co/XS3rHhQ/checked-1.png"
            };
            embed.fields = [{
                name: "🏁 End Result:",
                value: vote.result.join('\n')
            }];

            votePrompt.edit({ embed }).catch(e => { return; });
            votePrompt.removeReactions().catch(e => { return; });

        });

    },
    options: {
        argsRequired: true,
        guildOnly: true,
        alerts: {
            invalidUsage: 'Please Specify Vote Content!'
        },
        aliases: ['voting']
    }
}