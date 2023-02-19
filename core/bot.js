const { Telegraf, session } = require("telegraf");
const { BOT_TOKEN } = require("../config/config.json");
const bot = new Telegraf(BOT_TOKEN);

bot.use(session());
// bot.telegram.setMyCommands([{ command: "/start", description: "Botni yangilash" }]);
bot.catch((error) => {
    console.log(error);
});

module.exports = bot; 