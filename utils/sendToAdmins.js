const bot = require("../core/bot");
const { ADMINS_ID } = require("../config/config.json");

module.exports = (...arg) => {
    const admins = ADMINS_ID.split(" ");
    admins.forEach(async (item) => {
        try {
            await bot.telegram.sendMessage(item, ...arg);
        } catch (error) {
            console.log(error);
        };
    });
};