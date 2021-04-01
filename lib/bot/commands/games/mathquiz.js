module.exports = {
    name: 'mathquiz',
    group: 'games',
    parent: '',
    run: async(bot, db, msg, args) => {

        var question = [];
        const mathsign = ['+', '*', '-', '/'];
        const totalquestion = Math.floor(Math.random() * 5);

        const filter = m => m.author.id === msg.member.id;
        const collector = new MessageCollector(bot, msg.channel, filter, {
            time: 1000 * 20,
            max: 1
        });

        for (var i = 0; i < totalquestion; i++) {
            var mathsignRandom = Math.floor(Math.random() * mathsign.length);
            question.push(Math.floor(Math.random() * 260) + mathsign[mathsignRandom])
        }

        const quiz = question.join('') + Math.floor(Math.random() * 135) + 10;
        const answer = Math.floor(eval(quiz));
        const quizPrompt = await msg.channel.send({
            "embed": {
                "color": 16768601,
                "title": "MATH QUIZ 🔢",
                "description": "What is the end result of:\n**```" + quiz + "```**\n> You Have **20** Seconds to Answer!",
                "author": {
                    "name": "OxO Games",
                    "icon_url": "https://gblobscdn.gitbook.com/spaces%2F-MDjPlUSPaVWwPAFHuXi%2Favatar-1596375938395.png?alt=media"
                }
            }
        });

        collector.on("collect", m => {

            const ans = Math.floor(parseInt(m.content.replace(/\D/g, "")));
            var alert = {
                "embed": {
                    "color": 16768601,
                    "title": "**👍 BETTER LUCK NEXT TIME!**",
                    "description": "> Never Stop Trying!"
                }
            }; // Default on Wrong Answer
            quizPrompt.delete().catch(e => { return; })

            if (ans == answer) {

                alert = {
                    "embed": {
                        "color": 16768601,
                        "title": "**🎉 CONGRATULATIONS!**",
                        "description": "> You Have Successfully Complete This Game!"
                    }
                }

            }

            msg.channel.send(alert, 0, 3000)

        });

        collector.on('end', collected => {

            if (collected.size == 0) {

                msg.channel.send({
                    "embed": {
                        "color": 16768601,
                        "title": "**👍 TIME's UP! BETTER LUCK NEXT TIME!**",
                        "description": "> Never Stop Trying!"
                    }
                }, 0, 3000);

            }

        });

    },
    options: {
        guildOnly: true
    }
}