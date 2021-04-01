/**
 * GUILDS
 * @example Schema
 * {
 *      key: GUILDID,
 *      value: DATA
 * }
 */

/**
 * @type Guild Settings
 */
const guilds_settings = [{
    key: "703245245315416184",
    value: {
        prefix: ["oxo"],
        token: "1673hz3t2pvc5",
        language: "en-US"
    }
}]


/**
 * @type Guild Auto Voice / Temporary Voice Channel
 * @todo DONE ✔
 */
const guilds_autovoices = [{
    key: "703245245315416184",
    value: {
        creatorID: "789126853004492800",
        //    ChannelID     |       OwnerID  
        "784038464777617438": "499021389572079620",
        "778171818473291786": "707256502162948108",
        "765091275396349992": "763993609460121611"
    },
}]


/**
 * @type Guild Custom Commands
 */
const guilds_customcommands = [{
    key: "703245245315416184",
    value: {
        // Command  |   Value
        "rules": "Please Follow All The Rules!",
        "welcome": "Please Read All The Rules Before Start Chatting on This Server!",
        "ping": "pong",
        "123": "456"
    }
}]


/**
 * @type Guild Greeters
 */
const guilds_greeters = [{
    key: "703245245315416184",
    value: {
        join_message: "Welcome to the Server!",
        join_privateMessage: "Hope you enjoy on our server!",
        join_card: {
            background: "https://1.bp.blogspot.com/-a2SVnr3RiFA/u/Fucek%2BMan%2BRizky%2BAefarlava.png",
            text: {
                content: "FUCEK CABUT",
                size: 60,
                color: "#ff0000"
            },
            username: {
                size: 35,
                color: "#2ed600"
            },
            userimage: {
                bordercolor: "#00289e",
                size: 190
            }
        },
        leave_message: "Bye Bye!",
        leave_privateMessage: "Why u leavin?",
        leave_card: {
            background: "https://cdn-2.tstatic.net/tribunnews/foto/bank/images/lutfi-agizal-minta-maaf.jpg",
            text: {
                content: "FUCEK CABUT",
                size: 60,
                color: "#ff0000"
            },
            username: {
                size: 35,
                color: "#2ed600"
            },
            userimage: {
                bordercolor: "#00289e",
                size: 190
            }
        }

    }
}]


/**
 * @type Guild Message Reaction Roles
 * @todo DONE ✔
 */
const guilds_reactionroles = [{
    key: "703245245315416184",
    value: {
        //   MessageID      |                   Roles
        "791348712709554186": {
            roles: ["780605829044371507", "783121629047291924"],
            channelID: "786529573319475220"
        },
        "791553361354424321": {
            roles: ["781134208537985055", "783151392818331678"],
            channelID: "786525337969492000"
        }
    }
}]


/**
 * @type Guild Music
 */
const guilds_musics = [{
    key: "703245245315416184",
    value: {
        requestChannelID: "783700264238579732",
        loop: true,
        tracklist: [{
            userID: "370571870929682445",
            url: "https://www.youtube.com/watch?v=iS1g8G_njx8",
            track: "QAAAnwIAOEFyaWFuYSBHcmFuZGUgZnQuIElnZ3kgQXphbGVhIC0gUHJvYmxlbSAoT2ZmaWNpYWwgVmlkZW8pAA1B"
        }, {
            userID: "228537642583588864",
            url: "https://www.youtube.com/watch?v=I-QfPUz1es8",
            track: "hZCBMaWFyAA5JbWFnaW5lRHJhZ29ucwAAAAAABFVgAAtJLVFmUFV6MWVzOAABACtodHRwc"
        }]
    }
}]


/**
 * @type Guild Sticky Messages
 * @todo DONE ✔
 */
const guilds_stickymessages = [{
    key: "703245245315416184",
    value: {
        // Channel ID
        "754661945553977374": {
            creatorID: "228537642583588864",
            content: "Do Not Spam!"
        },
        "755290456623022111": {
            creatorID: "547905866255433758",
            content: "Hi, Please Read the Rules!"
        }
    }
}]


/**
 * USERS
 * @example Schema
 * {
 *      key: USERID,
 *      value: DATA
 * }
 */

/* === */
const users_afks = [{
    key: "231721153444446208",
    value: "Lagi visualisasi data"
}]


/* === */
const users_musicplaylists = [{
    key: "231721153444446208",
    value: {
        // Playlist Name (Space Replaced by Underscore && Case Insensitive && Only Include [a-Z & 0-9])
        "favorites": [{
            url: "https://www.youtube.com/watch?v=iS1g8G_njx8",
            track: "QAAAnwIAOEFyaWFuYSBHcmFuZGUgZnQuIElnZ3kgQXphbGVhIC0gUHJvYmxlbSAoT2ZmaWNpYWwgVmlkZW8pAA1B"
        }, {
            url: "https://www.youtube.com/watch?v=I-QfPUz1es8",
            track: "hZCBMaWFyAA5JbWFnaW5lRHJhZ29ucwAAAAAABFVgAAtJLVFmUFV6MWVzOAABACtodHRwc"
        }]
    }
}]


/* === */
const users_settings = [{
    key: "231721153444446208",
    value: {
        language: "en-US"
    }
}]