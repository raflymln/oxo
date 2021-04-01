const Canvas = require('canvas');
const axios = require('axios');
const prettyMilliseconds = require('pretty-ms');
const util = require('util');

module.exports = (bot, db) => new class Util {

    // [CANVAS]
    draw = async(url) => {
        const img = await Canvas.loadImage(url);
        const canvas = Canvas.createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');

        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const axis = (pos) => (canvas[pos] / 2) - (img[pos] / 2) * scale;

        ctx.drawImage(img, axis('width'), axis('height'), img.width * scale, img.height * scale);

        return canvas.toBuffer()
    }

    wrapText = (context, text, x, y, maxWidth, lineHeight) => {

        var words = text.split(' ');
        var line = '';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }

        context.fillText(line, x, y);

    }

    renderCard = async(member, data) => {

        // Assets
        var background, logo, userAvatar;
        const user = this.breakword(member.username, 15, false) + `#${member.discriminator}`;

        try {

            background = await Canvas.loadImage(data.background);
            logo = await Canvas.loadImage(__basedir + '/assets/img/logo-transparent.png');
            userAvatar = await Canvas.loadImage(member.avatarURL);

        } catch (e) {

            const defaultBackground = __basedir + '/assets/img/default-card.png';
            background = await Canvas.loadImage(defaultBackground);

        }

        // Default Canvas
        const canvas = Canvas.createCanvas(800, 300);
        const ctx = canvas.getContext('2d');

        // Background Color
        ctx.fillStyle = '#09031E';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Background Image
        const scaleBackground = ((img) => {

            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const axis = (pos) => (canvas[pos] / 2) - (img[pos] / 2) * scale;

            ctx.drawImage(img, axis('width'), axis('height'), img.width * scale, img.height * scale);

        })(background);

        // Bot Logo Image
        ctx.drawImage(logo, canvas.width / 2 - 180, canvas.height / 2 - 110, 100, 100);

        // Welcome Text
        ctx.font = `${data.text.size}px "Lilita"`;
        ctx.fillStyle = data.text.color;
        ctx.textAlign = "center";
        ctx.fillText(data.text.content, canvas.width / 2 - 140, canvas.height / 2 + 30);

        // User Name Text
        ctx.font = `${data.username.size}px "Lilita"`;
        ctx.fillStyle = data.username.color;
        ctx.textAlign = "center";
        ctx.fillText(user, canvas.width / 2 - 140, canvas.height / 2 + 65);

        // Avatar Image + Border
        const createAvatar = ((conf) => {

            const width = canvas.width / 2
            const height = canvas.height / 2

            ctx.fillStyle = conf.bordercolor;
            ctx.fillRect(width + 130, height - (conf.size / 2), conf.size, conf.size);
            ctx.drawImage(userAvatar, width + 140, height - (conf.size / 2 - 10), conf.size - 20, conf.size - 20);

        })(data.userimage);

        return canvas.toBuffer();

    }

    // [EMOJI CONVERTER]
    toEmoji = (number) => {
        var emoji

        switch (number) {
            case 1:
                emoji = '1️⃣';
                break;
            case 2:
                emoji = '2️⃣';
                break;
            case 3:
                emoji = '3️⃣'
                break;
            case 4:
                emoji = '4️⃣'
                break;
            case 5:
                emoji = '5️⃣'
                break;
            case 6:
                emoji = '6️⃣'
                break;
            case 7:
                emoji = '7️⃣'
                break;
            case 8:
                emoji = '8️⃣'
                break;
            case 9:
                emoji = '9️⃣'
                break;
            case 10:
                emoji = '🔟'
                break;
            default:
                emoji = '0️⃣'
                break;
        }

        return emoji
    }

    toNumber = (emoji) => {
        var num

        switch (emoji) {
            case '1️⃣':
                num = 1;
                break;
            case '2️⃣':
                num = 2;
                break;
            case '3️⃣':
                num = 3;
                break;
            case '4️⃣':
                num = 4;
                break;
            case '5️⃣':
                num = 5;
                break;
            case '6️⃣':
                num = 6;
                break;
            case '7️⃣':
                num = 7;
                break;
            case '8️⃣':
                num = 8;
                break;
            case '9️⃣':
                num = 9;
                break;
            case '🔟':
                num = 10;
                break;
        }

        return num;
    }

    // [VALIDATOR]
    isValidURL = (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    isYoutubeURL = (url) => {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(p)) {
            return url.match(p)[1];
        }
        return false;
    }

    // [UTIL]
    prettyms = (ms, options = {}) => prettyMilliseconds(ms, options);
    inspect = (obj, opts) => util.inspect(obj, opts);
    ucWords = (text) => text.replace(/\b[a-z]/g, letter => letter.toUpperCase());
    random = (min, max) => Math.floor(Math.random() * max) + min;
    randomBool = () => this.random(0, 2) === 1 ? true : false;

    breakword = (text, maxLength, dot = false) => {
        if (text.length > maxLength) {
            text = text.substr(0, maxLength);
        }
        return (!dot) ? text : text + '...';
    }

    generateUID = () => {
        var firstPart = (Math.random() * 46656) | 0;
        var secondPart = (Math.random() * 46656) | 0;
        firstPart = ("000" + firstPart.toString(36)).slice(-3);
        secondPart = ("000" + secondPart.toString(36)).slice(-3);
        return firstPart + secondPart;
    }

    getImage = async(msg, args) => {

        const channel = msg.channel;
        const guild = channel.guild;

        const member = (guild && args[0]) ? guild.members.get(args[0].replace(/\D/g, "")) : false;
        const compress = url => url
            .replace('?size=128', '?size=256')
            .replace('?size=4096', '?size=256')
            .replace('.gif', '.jpg');

        if (member) {
            return compress(member.avatarURL)
        } else {
            const cdn = 'https://cdn.discordapp.com';
            const imgType = ['.png', '.jpg'];
            const getLastImage = await channel
                .getMessages(50)
                .then(x => x.find(x =>
                    (x.attachments.length > 0) ||
                    (x.content.startsWith(`${cdn}/avatars/`)) ||
                    (x.content.startsWith(cdn) && imgType.indexOf(x.content) !== -1) ||
                    (this.isValidURL(x.content) && x.content.endsWith('.png')) ||
                    (this.isValidURL(x.content) && x.content.endsWith('.jpg'))
                ));

            if (!getLastImage) return false;

            if (getLastImage.attachments.length > 0) {
                return compress(getLastImage.attachments[0].url)
            } else {
                return compress(getLastImage.content)
            }
        }

    }

}