const Xscr = require('../events');
const Language = require('../language');
const Lang = Language.getString('spammer');

let totalMaxSpamCount = 50


Xscr.addCommand({ pattern: 'spam ?(.*)', fromMe: true, desc: Lang.SPAM_DESC }, (async (message, match) => {

    if (match[1] === '') {
        return await message.sendMessage(Lang.NEED_WORD);
    }


    if (totalMaxSpamCount !== 0) {
        for (let index = 0; index < totalMaxSpamCount; index++) {
            await message.sendMessage(match[1])
        }
    }


}));

Xscr.addCommand({ pattern: 'killspam', fromMe: true, desc: Lang.STOP_SPAMDESC }, (async (message, match) => {

    totalMaxSpamCount = 0
    await message.sendMessage(Lang.STOP_SPAM);

}));
