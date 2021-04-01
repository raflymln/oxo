module.exports = {
    name: 'shardDisconnect',
    run: async(bot, db, ...args) => {
        log(bot, db, ...args);
    }
}

const log = (bot, db, error, id) => {
    const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
    const shard = bot.shards.get(id);
    const gateway = shard.discordServerTrace[0].split('"').filter(x => x.includes('gateway'))[0];
    const latency = shard.latency;

    console.log('\x1b[1m\x1b[31m%s\x1b[0m', `> ${date} | Shard Disconnect ID: ${id}! [${gateway}]`);
    if (error) console.error(error);

    bot.send(config.bot.options.logChannelID, {
        embed: {
            description: [
                '```ml',
                `[ ${date} ]`,
                `> Shard ID: ${id}`,
                `> Gateway: ${gateway}`,
                `> Latency: ${latency}`,
                '```'
            ].join('\n'),
            color: 14700384,
            author: {
                name: `Shard Disconnect! [ID: ${id}]`,
                icon_url: bot.user.avatarURL
            }
        }
    })
}