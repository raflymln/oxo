module.exports = {
    name: 'dashboard',
    run: async(bot, db, socket, guildID) => {

        var data = read('guilds/settings');
        var customCommands = read('guilds/customcommands')
        var guild = bot.guilds.get(guildID);

        const sents = Object.assign({
            createdAt: guild.createdAt,
            iconURL: guild.iconURL,
            bannerURL: guild.bannerURL || 'https://wallpaperaccess.com/full/3053366.png',
            owner: guild.members.get(guild.ownerID),
            channelsMap: {
                text: guild.channels.filter(x => x.type === 0),
                voice: guild.channels.filter(x => x.type === 2),
                category: guild.channels.filter(x => x.type === 4),
                news: guild.channels.filter(x => x.type === 5),
                store: guild.channels.filter(x => x.type === 6),
            },
            prefix: data[guildID].prefix,
            token: data[guildID].token,
            data: {
                settings: data[guildID],
                customCommands
            }
        }, guild)

        delete sents._client
        socket.emit('Base:Init', sents);

        socket.on('Card:Update', async(type, settings) => {

            const renderedCard = await util.renderCard(settings, type);
            data[guildID][type] = settings;

            write('guilds/settings', data);
            socket.emit('Card:Render', type, renderedCard)

        })

        socket.on('Settings:Update', async updates => {

            const check = channel => {

                if (updates[channel] && !guild.channels.get(updates[channel])) {

                    const ch = channel
                        .replace('_', ' ')
                        .replace(/\b[a-z]/g, letter => letter.toUpperCase());

                    socket.emit('err', `${ch} Not Found!`);
                    return false;

                }

                return true;

            }

            if (!check('join_channel') || !check('leave_channel')) return;

            Object.keys(updates).forEach(x => {

                if (!updates[x]) delete data[guildID][x]
                else {

                    switch (x) {

                        case 'join_card':
                        case 'leave_card':
                            if (!data[guildID][x])
                                data[guildID][x] = {
                                    background: "assets/img/default-card.png",
                                    text: {
                                        content: (x == 'join_card') ? "WELCOME!" : 'SEE YOU SOON!',
                                        size: (x == 'join_card') ? 70 : 60,
                                        color: "#FFDE59"
                                    },
                                    username: {
                                        size: 35,
                                        color: "#FAFAFA"
                                    },
                                    userimage: {
                                        bordercolor: "#261D44",
                                        size: 190
                                    }
                                }
                            break;

                        default:
                            data[guildID][x] = updates[x];
                            break;

                    }

                }

            })

            write('guilds/settings', data);

            guildData = JSON.parse(JSON.stringify(data[guildID]));
            guildData.cards = {
                join_card: (data[guildID].join_card) ? await util.renderCard(data[guildID].join_card, 'join_card') : false,
                leave_card: (data[guildID].leave_card) ? await util.renderCard(data[guildID].leave_card, 'leave_card') : false
            }

            socket.emit('Settings:NewData', guildData);

        })

        socket.on('Settings:RegenerateToken', token => {
            data[guildID].token = token;
            write('guilds/settings', data);
        })

        socket.on('Settings:NewPrefix', newPrefix => {
            bot.registerGuildPrefix(guildID, newPrefix)
            data[guildID].prefix = newPrefix;
            write('guilds/settings', data);
        })

        socket.on('CustomCommands:New', (commandName, commandContent) => {

            if (!customCommands[guildID]) customCommands[guildID] = {}

            if (customCommands[guildID] && !customCommands[guildID][commandName]) {

                customCommands[guildID][commandName] = commandContent
                write('guilds/customcommands', customCommands);

                socket.emit('CustomCommands:Update', commandName, commandContent);

            } else {

                socket.emit('err', 'Already Have That Command Name, Please Delete It First!')

            }

        })

        socket.on('CustomCommands:Delete', command => {

            if (customCommands[guildID]) {

                delete customCommands[guildID][command]
                if (Object.keys(customCommands[guildID]).length === 0) delete customCommands[guildID];

                write('guilds/customcommands', customCommands)

            }

        })

        socket.on('Event:Emit', event => bot.emit(event, guild, guildAddons.owner))

    }
}