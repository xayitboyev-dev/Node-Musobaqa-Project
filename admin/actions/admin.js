const bot = require("../../core/bot");
const {main} = require('../keyboards/button')
const {ADMIN_ID} = require('../config/config.json')

bot.command('admin',(ctx) => {
    adminId = ADMIN_ID; 
    userId = ctx.chat.id; 
    if (adminId === userId){
        ctx.reply('Salom Admin', main)
        return;
    }
    console.log('User')
});

