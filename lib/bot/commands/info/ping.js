module.exports = {
    name: 'ping',
    group: 'info',
    parent: '',
    run: async(bot, db, msg, args) => {

        const guild = msg.channel.guild;
        const shardID = guild ? bot.guildShardMap[guild.id] : 0
        const latency = bot.shards.get(shardID).latency

        msg.channel.send({
            embed: {
                description: `Shard Latency: **__\`${latency}ms\`__**`,
                color: 2537428,
                author: {
                    name: 'Ping',
                    icon_url: 'https://i.ibb.co/XFGZX9V/question.png'
                }
            }
        });

    },
    options: {}
}