/* [DEFAULT] */

const guildID = window.location.href.split('/').find(x => x !== '' && !isNaN(x));
var guild = {}
const socket = io.connect();
const settings = {
    all: ['join_channel', 'leave_channel', 'join_message', 'leave_message', 'join_pm', 'leave_pm', 'join_card', 'leave_card'],
    channel: ['join_channel', 'leave_channel'],
    messages: ['join_message', 'leave_message', 'join_pm', 'leave_pm'],
    card: ['join_card', 'leave_card']
}

/* [BASE] */

socket.emit('INIT', 'dashboard', guildID)
socket.on('err', data => alertify.alert(`⛔ ${data}`));
socket.on('error', data => alertify.alert(`⛔ ${data}`));

/* [INIT] */

socket.on('Base:Init', (guildData) => {

    /* [INIT] */

    if (guildData) {

        console.log(guildData)
        guild = guildData

        clearInterval(preloader);
        $(".preloader").fadeOut(1000);
        document.title = `OxO | Dashboard | ${guild.name}`;

        $('[data-tag=guildname]').html(guild.name);
        $('[data-tag=guildlogo]').attr('src', guild.iconURL);
        $("[data-tag=guildbanner]").css('background', `url(${guild.bannerURL})`);

        alertify.warning('Refreshed!');
        socket.emit('asdad', '123123123')

    }

    /* [OVERVIEW] */

    const overview = (() => {

        // Overview Data
        var overviewData = {
            "Owner": `${guild.owner.user.username} (${guild.ownerID})`,
            "Created At": new Date(guild.createdAt).toString(),
            "Region": ucWords(guild.region),
            "Features": ucWords(guild.features.join(', ').replace(/_/gi, ' ').toLowerCase()),
            "Roles Count": objLength(guild.roles) + " Roles",
            "Custom Emojis Count": guild.emojis.length + " Custom Emojis",
            "Member Count": guild.memberCount + " Members"
        };

        Object.keys(guild.channelsMap).forEach(x =>
            overviewData[`${ucWords(x)} Channel Count`] = objLength(guild.channelsMap[x]) + " Channels"
        );

        Object.keys(overviewData).forEach(x =>
            $('#overview div #guildinfo tbody').append(`<tr><td>${x}</td><td>${overviewData[x]}</td></tr>`)
        );

        // OxO Settings
        var data = JSON.parse(JSON.stringify(guild.data));

        delete data.customCommands
        delete data.cards
        data['OxO Joined Date'] = new Date(guild.joinedAt).toString();
        data.token =
            `<u id="guildtoken">${guild.token}</u> ` +
            `<a href="#!" onclick="Settings.RegenerateToken()" id="regenerateTokenBtn">[Regenerate]</a>`
        data.prefix =
            `<a id="guildprefix">${guild.prefix.join(' | ')}</a> ` +
            `<a href="#!" onclick="Settings.ChangePrefix()">[Change]</a>`

        settings.all.forEach(x => data[x] = (data[x]) ? 'Configured' : '<b>Not Configured</b>')

        Object.keys(data).forEach(x => {

            var y = x
                .replace('_', ' ')
                .replace(/pm/gi, 'Private Message');

            var z = String(data[x])
                .replace(/true/gi, 'Configured')
                .replace(/<@762660297981820989>/gi, '@mention')

            $('#overview div #oxosettings tbody').append(`<tr id='${x}'><td>${ucWords(y)}</td><td>${z}</td></tr>`)

        })

    })();


    /* [SETTINGS] */

    const overviewSettings = (() => {

        const tc = guild.channelsMap.text

        settings.channel.forEach(x => {

            Object.keys(tc).forEach(ch => {

                $(`select#${x}`)
                    .append($("<option></option>")
                        .attr("value", tc[ch].id)
                        .text(tc[ch].name));

            })

            if (guild.data[x]) $(`select#${x}`).val(guild.data[x])

        })

        settings.messages.forEach(x => {

            if (guild.data[x]) {

                const val = guild.data[x]
                    .replace('<@${member.id}>', '{user}')
                    .replace('${member.username}#${member.discriminator}', '{username}')
                    .replace('${guild.name}', '{guild}')
                    .replace('${guild.memberCount}', '{membercount}');

                $(`input[data-setting=${x}]`).click()
                $(`textarea[data-setting=${x}]`).val(val)

            }

        });

        settings.card.forEach(x => Card.Refresh(x, guild.data.cards[x], guild.data[x]))

    })();

    /* [CUSTOM COMMANDS] */

    Object.keys(guild.data.customCommands).forEach(x => {
        $('#guildcustomcommands tbody').append(`
        <tr id="${x.replace(/!/gi, '')}">
            <td>${x}</td>
            <td>${guild.data.customCommands[x]}</td>
            <td>
                <input type="button" style="background:#232323;color:white;" onclick="CustomCommands.Delete('${x}')" value="Delete">
            </td>
        </tr>
        `)
    });

});


/* [CARD] */

socket.on('Card:Render', (type, card) => $(`img[data-card=${type}]`).attr('src', card))

const Card = {

    Refresh: (type, card, data) => {

        if (data) {

            $(`a[data-setting=${type}]`).data('tab', type);
            $(`input[type=checkbox][data-setting=${type}]`).click()
            $(`input[type=button][data-setting=${type}]`).val('Configure');

            const updateCardSettings = (() => {

                $(`img[data-card=${type}]`).attr('src', card);

                data.background = (data.background == 'assets/img/default-card.png') ? 'default' : data.background
                $(`input[data-card=${type}-background]`).val(data.background)

                $(`input[data-card=${type}-text_color]`).val(data.text.color)
                $(`input[data-card=${type}-text_content]`).val(data.text.content)
                $(`input[data-card=${type}-text_size]`).val(data.text.size)

                $(`input[data-card=${type}-username_color]`).val(data.username.color)
                $(`input[data-card=${type}-username_size]`).val(data.username.size)

                $(`input[data-card=${type}-userimage_bordercolor]`).val(data.userimage.bordercolor)
                $(`input[data-card=${type}-userimage_size]`).val(data.userimage.size)

            })()

        } else {

            $(`a[data-setting=${type}]`).data('tab', 'settings');
            $(`input[type=button][data-setting=${type}]`).val('(Disabled) Please Update It First!');

        }

    },

    Update: (type) => {

        const background = $(`input[data-card=${type}-background]`).val();

        if (background.toLowerCase() !== 'default' && !validURL(background)) {
            alertify.alert('Not a Valid URL!');
            return;
        }

        const settings = {
            background: (background.toLowerCase() == 'default') ? 'assets/img/default-card.png' : background,
            text: {
                content: $(`input[data-card=${type}-text_content]`).val(),
                size: $(`input[data-card=${type}-text_size]`).val(),
                color: $(`input[data-card=${type}-text_color]`).val()
            },
            username: {
                size: $(`input[data-card=${type}-username_size]`).val(),
                color: $(`input[data-card=${type}-username_color]`).val()
            },
            userimage: {
                bordercolor: $(`input[data-card=${type}-userimage_bordercolor]`).val(),
                size: $(`input[data-card=${type}-userimage_size]`).val()
            }
        }

        socket.emit('Card:Update', type, settings)

    }

}


/* [SETTINGS] */

socket.on('Settings:NewData', data => settings.card.forEach(x => Card.Refresh(x, data.cards[x], data[x])))

const Settings = {

    Update: () => {

        var data = {}

        settings.channel.forEach(x => data[x] = $(`select#${x}`).val());
        settings.card.forEach(x => data[x] = $(`input#${x}`).is(":checked"));
        settings.messages.forEach(x => {

            const checked = $(`input[type=checkbox][data-setting=${x}]`).is(":checked");

            if (!checked) data[x] = false
            else data[x] = $(`textarea#${x}`).val()
                .replace(/{user}/gi, '<@${member.id}>')
                .replace(/{guild}/gi, '${guild.name}')
                .replace(/{username}/gi, '${member.username}#${member.discriminator}')
                .replace(/{membercount}/gi, '${guild.memberCount}');

        });

        if (data && (data['join_message'] || data['join_card']) && !data['join_channel']) {
            alertify.alert('Join Channel Can\'t Be Empty!');
            return;
        }

        if (data && (data['leave_message'] || data['leave_card']) && !data['leave_channel']) {
            alertify.alert('Leave Channel Can\'t Be Empty!');
            return;
        }

        socket.emit('Settings:Update', data)

        settings.all.forEach(x => {
            $(`#oxosettings tr#${x}`).remove();
            data[x] = (data[x]) ? 'Configured' : '<b>Not Configured</b>'
        })

        Object.keys(data).forEach(x => {

            var y = x
                .replace('_', ' ')
                .replace(/pm/gi, 'Private Message');

            var z = String(data[x])
                .replace(/true/gi, 'Configured')
                .replace(/<@762660297981820989>/gi, '@mention')

            $('#overview div #oxosettings tbody').append(`<tr id="${x}"><td>${ucWords(y)}</td><td>${z}</td></tr>`)

        })

    },

    RegenerateToken: () => {

        var token = generateUniqueID()

        history.pushState({}, null, token);
        $('#guildtoken').html(token);

        $('#regenerateTokenBtn')
            .html('[Please Wait. . .]')
            .attr('onclick', '')
            .removeAttr("href");

        setTimeout(() => {

            $('#regenerateTokenBtn')
                .html('[Regenerate]')
                .attr('onclick', 'Settings:RegenerateToken()')
                .attr('href', '#!');

        }, 5000);

        socket.emit('Settings:RegenerateToken', token);

    },

    ChangePrefix: () => {
        alertify.prompt('Change Prefix', 'New Prefix (Separated by Commas ",")',
            String(guild.data.prefix).replace(/<@762660297981820989>/gi, '@mention'),
            function(evt, value) {

                var newPrefix = value
                    .replace(/[\u0250-\ue007]/g, '')
                    .split(',')
                    .filter(pref => pref.trim().length > 0);

                var alerts = []

                newPrefix.forEach((x, i) => {
                    newPrefix[i] = String(newPrefix[i]).trim()

                    if (newPrefix[i].startsWith('<') && newPrefix[i].endsWith('>')) {
                        alerts.push('⛔ Prefix Cannot Start With "<" and Ends With ">"!')
                    }

                    if (newPrefix[i] !== '@mention' && newPrefix[i].length >= 8) {
                        alerts.push('⛔ Prefix Length Cannot Be More Than 8 Character!')
                    }

                })

                newPrefix = newPrefix
                    .filter(x => x.length <= 8)
                    .filter(x => !x.startsWith('<') && !x.endsWith('>'))
                    .join(',')
                    .replace(/@mention/gi, '<@762660297981820989>')
                    .split(',');

                // [Filter Repeated Value]
                function getUnique(array) {
                    var uniqueArray = [];

                    // Loop through array values
                    for (i = 0; i < array.length; i++) {
                        if (uniqueArray.indexOf(array[i]) === -1) {
                            uniqueArray.push(array[i]);
                        }
                    }
                    return uniqueArray;
                }

                newPrefix = getUnique(newPrefix)

                if (newPrefix.length === 0) {

                    alerts.push('⛔ Prefix Couldn\'t Be Empty!');
                    alertify.alert(alerts.join('<br>'))
                    return;

                } else if (newPrefix.length >= 5) {

                    alerts.push('⛔ Cannot Add More Than 5 Prefix!');
                    alertify.alert(alerts.join('<br>'))
                    return;

                } else {

                    // Check If New Prefix is Equal to Old Prefix
                    function arrayEquals(a, b) {
                        return Array.isArray(a) &&
                            Array.isArray(b) &&
                            a.length === b.length &&
                            a.every((val, index) => val === b[index]);
                    }

                    if (!arrayEquals(newPrefix, guild.data.prefix)) {

                        guild.data.prefix = newPrefix

                        $('#guildprefix').html(`<a id="guildprefix">${newPrefix.join(' | ').replace(/<@762660297981820989>/gi, '@mention')}</a> `)


                        if (alerts.length > 0) alerts.push('<br>✅ Prefix STILL Updated, Removed Non-Filtered Prefix!');
                        else alerts.push('✅ Prefix Updated')
                        alertify.alert(alerts.join('<br>'))

                        socket.emit('Settings:NewPrefix', newPrefix)

                    }

                }

            },
            function() {

                alertify.error('Cancel')

            });
    }

}


/* [CUSTOM COMMANDS] */

socket.on('CustomCommands:Update', (x, y) => {

    $('#guildcustomcommands tbody').append(`
    <tr id="${x.replace(/!/gi, '')}">
        <td>${x}</td>
        <td>${y}</td>
        <td>
            <input type="button" style="background:#232323;color:white;" onclick="CustomCommands.Delete('${x}')" value="Delete">
        </td>
    </tr>
    `)

})

const CustomCommands = {

    New: () => {
        const cmd = $('input#newcommand')
        const cmdContent = $('textarea#newcommandcontent')

        if (!cmd.val() || !cmdContent.val()) return;

        if (!cmd.val().startsWith('!')) {
            alertify.alert('Command Name Must Started With "!"');
            return;
        }

        socket.emit('CustomCommands:New', cmd.val(), cmdContent.val())

        cmd.val('');
        cmdContent.val('')
    },

    Delete: x => {

        $(`#guildcustomcommands > tbody > tr#${x.replace(/!/gi, '')}`).remove();

        socket.emit('CustomCommands:Delete', x)

    }

}


/* [EVENT] */

const Events = {

    Emit: event => setTimeout(() => socket.emit('Event:Emit', event), 1000)

}