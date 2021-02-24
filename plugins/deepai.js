
const Xscr = require('../events');
const {MessageType,Mimetype} = require('@adiwajshing/baileys');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg'); 
const {execFile} = require('child_process');
const cwebp = require('cwebp-bin');
const axios = require('axios'); 
const Config = require('../config'); 

const got = require("got"); // Responses Catcher
const deepai = require('deepai'); 
deepai.setApiKey('4ec4c7f4-63cd-457f-b244-7e12bba7ebde'); // Quickstart API Key

const Language = require('../language'); 
const Lang = Language.getString('deepai'); // Language Support
const Lang = Language.getString('bywordsglobal');

Xscr.addCommand({pattern: 'deepai', fromMe: true, deleteCommand: false, desc: Lang.DEEPAI_DESC}, (async (message, match) => {

    await message.sendMessage('💻 Usage: *.moodai <text>*\nℹ️ Desc: 🇮🇩 Ini menemukan suasana hati Anda dari artikel yang Anda tulis.\n🇬🇧 It finds your mood from the article you wrote.\n\n💻 Usage: *.colorai*\nℹ️ Desc: 🇮🇩 Membuat foto menjadi hitam putih.\n🇬🇧 It colorize bw photos.\n\n💻 Usage: *.superai*\nℹ️ Desc: 🇮🇩 Meningkatkan kualitas foto dengan Neural AI.\n🇬🇧 Improves the quality of photos with Neural AI.\n\n💻 Usage: *.waifuai*\nℹ️ Desc: 🇮🇩 Menggabungkan palet warna foto dengan kecerdasan buatan.\n🇬🇧 Combines the color palettes of photos with artificial intelligence.\n\n💻 Usage: *.dreamai*\nℹ️ Desc: 🇮🇩 Menerapkan deepdream efek ke foto.\n🇬🇧 Applies deepdream effect to the photo.\n\n💻 Usage: *.neuraltalkai*\nℹ️ Desc: 🇮🇩 Jelaskan fenomena dalam foto dengan kecerdasan buatan.\n🇬🇧 Explain the phenomenon in the photo with artificial intelligence.\n\n💻 Usage: *.ttiai <text>*\nℹ️ Desc: 🇮🇩 Mengubab teks ke gambar.\n🇬🇧 Converts text to a picture. (Text-to-Image)\n\n💻 Usage: *.toonai*\nℹ️ Desc: 🇮🇩 Membuat foto wajah menjadi karater kartun.\n🇬🇧 Turns the face in the photo into a cartoon character.\n\n💻 Usage: *.textai <text>*\nℹ️ Desc: 🇮🇩 Ini menciptakan cerita buatan untuk Anda dari kalimat Anda.\n🇬🇧 It creates an artificial story for you from your sentence.\n\n💻 Usage: *.nudityai*\nℹ️ Desc: 🇮🇩 Ini menunjukkan nilai NSFW antara 1 dan 0 di foto. \n🇬🇧 It shows the NSFW value between 1 and 0 in the photo.\n\n💻 Usage: *.ganstyle*\nℹ️ Desc: 🇮🇩 Menggabungkan foto yang anda balas dengan foto anda pilih.\n🇬🇧 Combines the photo you answered with the selected picture.\n\n⚠️ 🇮🇩 *Semua alat di sini berfungsi dengan pembelajaran mendalam. Semakin banyak Anda menggunakannya, semakin banyak informasi yang disimpannya.* ```Gunakan karakter bhsa indonesia!```\n\n⚠️ 🇬🇧 *All the tools here work with deep learning. The more you use it, the more information it stores.* ```Use only english characters!```');

}));

Xscr.addCommand({pattern: 'colorai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Colorizing.. 🎨',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("colorizer", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: Lang.BY_WORD})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Xscr.addCommand({pattern: 'waifuai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Mixing.. 🧩',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("waifu2x", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: Lang.BY_WORD})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Xscr.addCommand({pattern: 'superai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Enhancing.. 🖌️',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("torch-srgan", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: Lang.BY_WORD})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Xscr.addCommand({pattern: 'moodai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("sentiment-analysis", {
        text: `${match[1]}`,

    });

    await message.reply(`*Mood:* ${resp.output}`);

}));

Xscr.addCommand({pattern: 'dreamai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Starry Night.. 🌃',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("deepdream", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: Lang.BY_WORD})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Xscr.addCommand({pattern: 'neuraltalkai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Reading.. 🙇🏻',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("neuraltalk", {
                image: fs.createReadStream("./output.jpg"),

            });

            await message.reply(`*Output:* ${resp.output}`);

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Xscr.addCommand({pattern: 'ttiai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("text2img", {
        text: `${match[1]}`,

    });

    var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

    await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: Lang.BY_WORD})

}));

Xscr.addCommand({pattern: 'toonai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Tooning.. 🌟',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("toonify", {
                image: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Xscr.addCommand({pattern: 'nudityai', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Finding NSFW.. 🔥',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("content-moderation", {
                image: fs.createReadStream("./output.jpg"),

            });

            await message.reply(`*Output:* ${resp.output.nsfw_score}`);

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));

Xscr.addCommand({pattern: 'textai ?(.*)', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {
    if (match[1] === '') return await message.sendMessage(Lang.TEXT);

    var resp = await deepai.callStandardApi("text-generator", {
        text: `${match[1]}`,

    });

    await message.reply(`*Article:*\n ${resp.output}`);

}));

Xscr.addCommand({pattern: 'ganstyle', fromMe: true, deleteCommand: false, dontAddCommandList: true}, (async (message, match) => {    
    if (message.reply_message === false) return await message.sendMessage('```Need Photo!```');

    var downloading = await message.client.sendMessage(message.jid,'Creating.. ♻️',MessageType.text);
    var location = await message.client.downloadAndSaveMediaMessage({
        key: {
            remoteJid: message.reply_message.jid,
            id: message.reply_message.id
        },
        message: message.reply_message.data.quotedMessage
    });

    ffmpeg(location)
        .save('output.jpg')
        .on('end', async () => {
            var resp = await deepai.callStandardApi("CNNMRF", {
                style: Config.GANSTYLE,
                content: fs.createReadStream("./output.jpg"),

            });

            var respoimage = await axios.get(`${resp.output_url}`, { responseType: 'arraybuffer' })

            await message.sendMessage(Buffer.from(respoimage.data), MessageType.image, {mimetype: Mimetype.jpg, caption: Lang.BY_WORD})

        });

        return await message.client.deleteMessage(message.jid, {id: downloading.key.id, remoteJid: message.jid, fromMe: true})

}));
