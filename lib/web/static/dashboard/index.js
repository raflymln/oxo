module.exports = {
    route: '/dashboard/:guildID/:guildToken',
    method: 'get',
    run: async(bot, db, req, res) => {

        const params = req.params
        const data = read('guilds/settings');

        if (!data[params.guildID]) {
            res.send('Invalid Guild ID')
            return;
        }

        if (params.guildToken !== data[params.guildID].token) {
            res.send('Invalid Guild Server Token.');
            return;
        }

        res.sendFile(__dirname + '/index.html');

    }
}