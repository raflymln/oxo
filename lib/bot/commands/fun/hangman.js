const hangman = [`
  +---+
  |   |
      |
      |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
      |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|\\\  |
      |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|\\\  |
 /    |
      |
=========
`, `
  +---+
  |   |
  O   |
 /|\\\  |
 / \\\  |
      |
=========
`];

module.exports = {
    name: 'hangman',
    group: 'fun',
    parent: '',
    run: async(bot, db, msg, args) => {

        msg.channel.send(`\`\`\`${hangman[args[0]]}\`\`\``)

    },
    options: {
        argsRequired: true
    }
}