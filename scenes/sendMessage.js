const { Markup, Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('sendMessage');
const bot = require('../core/bot');
const sendToAdmins = require('../utils/sendToAdmins');
const { replyMessage } = require("../keyboards/inline");

scene.enter(async (ctx) => {
    console.log(ctx.scene.state.userId);
    console.log(ctx.scene.state.from);
    ctx.reply("📩 Xabaringizni yozib qoldiring!");
});

scene.on("text", (ctx) => {
    if (ctx.scene.state.userId == "admin") {
        sendToAdmins(ctx.message?.text, replyMessage(ctx.scene.state?.from));
    } else {
        bot.telegram.sendMessage(ctx.scene.state?.userId, ctx.message?.text, replyMessage(ctx.scene.state?.from));
    };
    ctx.reply("✅ Muvaffaqiyatli yuborildi!");
    ctx.scene.leave();
});

scene.on("message", (ctx) => {
    ctx.reply("Iltimos faqat yozuvli habar qoldiring!");
});

module.exports = scene;