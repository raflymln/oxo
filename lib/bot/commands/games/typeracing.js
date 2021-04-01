const Canvas = require('canvas');
const { MessageCollector } = require('@raflymln/eris');

module.exports = {
    name: 'typeracing',
    group: 'games',
    parent: '',
    run: async(bot, db, msg, args) => {

        const time = 15;
        var text = [];

        const generateWords = (() => {

            const wordlist = "Promethium eminency extraditing teen caponizing calcutta vaughn grimsby gapingly nonformative spancelled indistinguishableness santonin unpoured Ickier prerevival residentiary allegorised sculpturesque noneducative scrimmage preplacental tristesse nonadhesive illiterate mesoblast nonsuggestible pommeled Nonencroachment dag westville langsyne foxglove campagus harness affricate hyperperfection eggbeater handwrought cental sanctimoniousness unpantheistical Nonconclusive semicylinder quintuplicate propitious tuberculinization photolithoprint charonian airedale hypotrachelium foreshadower agabus labradoritic courtliest noncontaminable Hireling cordinal nonundergraduate reabridge nonexpiration bard intumescing spatting resight polysomic receptacle interannular ahmednagar unskilfully Weariness unreciprocating superobjectionable sulphurate systemizable cubic quippu application eichmann warsaw divestiture remontoir variegated tropic Grouter undetestable undset overchafing blakemore torquemada saros conglobate unprofane protagoras officialise cant subprofessional yelp Coo lobelia hyperostosis rabbiter arrondissement yenisey indre erina karanda liaopeh chrestomathic frankness hexahydroxycyclohexane disspreading Norm presupplying sinuses preconsultor vendibly caver suckling applaudable prebesetting airplot truckload dating nonconstructive overfunctioning Telesis leapt reaccelerate allison cuckoldry uncover honkies unfetched radionuclide lilith specious preneglect hecaleius demasculinization Thinkably remittor knickerbockered overservility aglaia crackers misbecome torchiest log retranslation holophytic donica krutch michelson Squamoseness anguish orfe antagonizable hallroom ascetic corrugating dentition eudiometric jewelfishes lehr verligte tenurially officer Compromised cloistral subirrigated fingerflower curfew erhardt unspiralled tzigane scraperboard lifelessly spikiness hypersensitized rejoiced tobago Nonimperialistically dirac abominate funereally mahlstick broider immoralism kroon guardafui cyclamen hypsometry antigorite skeptical cannae Sparsely lee outwasting unbrutalized tabid cornwallis schechter obtestation seethe unperspicuous machera cordia ichthyosaurus transitivity".split(' ');

            for (var i = 0; i < 3; i++) { text.push(wordlist[Math.floor(Math.random() * wordlist.length)]) };

        })();

        const canvas = Canvas.createCanvas(800, 300);
        const ctx = canvas.getContext('2d');
        const avatar = await Canvas.loadImage(bot.user.avatarURL);
        const createImage = (() => {

            ctx.fillStyle = "#09031E";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = '35px "SecularOne"';
            ctx.fillStyle = '#FFDE59';

            ctx.textBaseline = "middle";
            ctx.textAlign = "center";
            util.wrapText(ctx, text.join(' '), canvas.width / 2, canvas.height / 2.5, canvas.width - 100, 35)

            ctx.drawImage(avatar, canvas.width / 2.25, canvas.height - 90, 80, 80);

        })();

        const embed = {
            embed: {
                color: 16768601,
                title: "Typing Racing 🏁",
                description: `> You Have **${time}** Seconds! **Get Ready**. . .`,
                "author": {
                    "name": "OxO Games",
                    "icon_url": bot.user.avatarURL
                }
            }
        }
        const prompt = await msg.channel.send(embed, {
            file: canvas.toBuffer(),
            name: 'oxo_typingracing.png'
        });

        setTimeout(async() => {

            const filter = (m) => m.author.id === msg.member.id;
            const collector = new MessageCollector(bot, msg.channel, filter, {
                time: 1000 * time,
                max: 1
            });

            embed.embed.title = `Typing Racing 🏁 | Starts Now!`;
            embed.embed.description = `> You Have **${time}** Seconds! **Starts Now!**`;
            prompt.edit(embed)

            collector.on("collect", async(m) => {

                prompt.delete().catch(e => { return; });
                var alert = {
                    embed: {
                        color: 16768601,
                        title: "**👍 BETTER LUCK NEXT TIME!**",
                        description: "> Never Stop Trying!"
                    }
                };

                if (m.content == text.join(' ')) {

                    alert = {
                        embed: {
                            color: 16768601,
                            title: "**🎉 CONGRATULATIONS!**",
                            description: "> You Have Successfully Complete This Game!"
                        }
                    }

                }

                msg.channel.send(alert, 0, 5000)

            });

            collector.on('end', collected => {

                if (collected.size == 0) {

                    prompt.delete().catch(e => { return; });
                    msg.channel.send({
                        embed: {
                            color: 16768601,
                            title: "**👍 TIME's UP! BETTER LUCK NEXT TIME!**",
                            description: "> Never Stop Trying!"
                        }
                    }, 0, 3000);

                }

            });

        }, 1000)

    },
    options: {
        guildOnly: true
    }
};