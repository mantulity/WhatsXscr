const chalk = require('chalk');
const {WAConnection} = require('@adiwajshing/baileys');
const {StringSession} = require('./whatsxscr/');
const fs = require('fs');

async function whatsXscr () {
    const conn = new WAConnection();
    const Session = new StringSession();  
    conn.logger.level = 'warn';
    conn.regenerateQRIntervalMs = 30000;
    
    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Xscr')}
${chalk.white.italic('XscrString Generate ')}

${chalk.blue.italic('ℹ️  Menunggu whatsapp web barcode scan ... silahkan scan barcode ini.')}`);
    });
    

    conn.on('open', () => {
        var st = Session.createStringSession(conn.base64EncodedAuthInfo());
        console.log(
            chalk.green.bold('Xscr StringKode Anda: '), Session.createStringSession(conn.base64EncodedAuthInfo())
        );
        
        if (!fs.existsSync('config.env')) {
            fs.writeFileSync('config.env', `XSCR_SESSION="${st}"`);
        }

        console.log(
            chalk.blue.bold('Jika selesai menginstal, Kamu dapat memulai bot dengan node bot.js.')
        );
        process.exit(0);
    });

    await conn.connect();
}

whatsXscr()