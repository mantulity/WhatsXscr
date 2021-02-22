
const Xscr = require('../events');
const Language = require('../language')
const Lang = Language.getString('aiscanner')

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}


Xscr.addCommand({ pattern: '.*', fromMe: true, dontAddCommandList: true }, async (message, match) => {
    if (Xscr.commands.filter(v => {
        try {
            const inputCommand = match.input.replace('.', '')
            const potentialCommand = v.pattern.toString()
                .replace('/^[.!;]', '')
                .replace('/', '')
                .replace('?(.*)', '')
                .replace('(?: |$)(.*)', '')
            if (inputCommand === potentialCommand) {
                return new Array(v)
            } else {
                return []
            }

        } catch (err) {
            console.log(err)
        }

    }).length < 1) {

        const similarities = []

        await message.sendMessage(Lang.SEARCHING);

        Xscr.commands.forEach(async (command) => {

            try {
                const inputCommand = match.input.replace('.', '')
                const potentialCommand = command.pattern.toString()
                    .replace('/^[.!;]', '')
                    .replace('/', '')
                    .replace('?(.*)', '')
                    .replace('(?: |$)(.*)', '')
                const c = similarity(inputCommand, potentialCommand)

                if (c > 0.50) {
                    similarities.push(potentialCommand)
                }
            } catch (err) {
                console.log(err)
            }
        });

        if (similarities.length > 0) {
            await message.sendMessage(Lang.FOUND + similarities.join('\n') + '```');
        } else {
            await message.sendMessage(Lang.NOT_FOUND);
        }
    }
})
