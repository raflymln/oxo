module.exports = {
    name: 'randomavatar',
    group: 'utils',
    parent: '',
    run: async(bot, db, msg, args) => {

        var source;
        const generator = (args[0]) ? args[0].toLowerCase() : true

        switch (generator) {

            case 'adorable':
                source = {
                    name: 'Adorable',
                    logo: 'https://api.adorable.io/avatars/285/abott@adorable.png',
                    url: `https://api.adorable.io/avatars/285/${Math.random()}.png`
                }
                break;

            case 'robot':
            default:
                source = {
                    name: 'RoboHash',
                    logo: 'https://robohash.org/24.218.243.24.png',
                    url: `https://robohash.org/${Math.random()}.png`
                }
                break;

        }

        msg.channel.send({
            "embed": {
                "color": 3325350,
                "author": {
                    "name": "Avatar Generator",
                    "icon_url": "https://i.ibb.co/1rv8WH5/medal.png"
                },
                "footer": {
                    "text": `Avatar by ${source.name}`,
                    "icon_url": source.logo
                },
                "image": {
                    "url": source.url
                }
            }
        })

    },
    options: {}
}