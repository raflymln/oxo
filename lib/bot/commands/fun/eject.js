module.exports = {
    name: 'eject',
    group: 'fun',
    parent: '',
    run: async(bot, db, msg, args) => {

        const member = msg.member;
        const guild = member.guild;
        const draw = Utils.canvas.draw;

        const user = (args[0]) ? guild.members.get(args[0].replace(/\D/g, "")) : msg.member
        if (!user) throw 'Cannot Find Specified User!';

        const colors = ['black', 'blue', 'brown', 'cyan', 'darkgreen', 'lime', 'orange', 'pink', 'purple', 'red', 'white', 'yellow'];
        const isImpostor = (Math.floor(Math.random() * 2) == 1) ? true : false;
        const selectedColor = colors[Math.floor(Math.random() * colors.length)]
        const url = `https://vacefron.nl/api/ejected?name=${user.username.replace(/[^a-z0-9]/gi, "")}&impostor=${isImpostor}&crewmate=${selectedColor}`;

        msg.channel.send({}, {
            file: await draw(url),
            name: isImpostor ? `Impostor.png` : 'Not_Impostor.png'
        });

    },
    options: {}
}