const { Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('register:main');
const { register } = require('../../keyboards/button');
const Worker = require("../../models/Worker");
const { registerResult } = require("../../keyboards/inline");

scene.enter(async (ctx) => {
    const user = await Worker.findOne({ userId: ctx.from.id });
    if (user?.confirmed === false) {
        ctx.reply("Siz ro'yxatdan o'tish uchun so'rov yuborgansiz. Adminlar uni tasdiqlagandan so'ng foydalanishingiz mumkin!", registerResult);
    } else {
        ctx.reply("Change Team botiga xush kelibsiz! \n\nBiz mijoz va ishchilarni online topishga yordam beramiz!", register);
    };
});

scene.action("check", async (ctx) => {
    const user = await Worker.findOne({ userId: ctx.from.id });
    if (user) {
        if (user?.confirmed) {
            ctx.answerCbQuery("✅ Tasdiqlangan, endi botdan foydalanishingiz mumkin!", { show_alert: true });
            ctx.deleteMessage();
            ctx.scene.enter("main", { from: "edit" });
        } else {
            ctx.answerCbQuery("❗️ Adminlar tasdiqlamagan, kuting.", { show_alert: true });
        };
    } else {
        ctx.answerCbQuery("❗️ Bekor qilingan, qaytadan ro'yxatdan o'ting.", { show_alert: true });
        ctx.scene.enter("register:main");
    };
});

scene.action("cancel", async (ctx) => {
    try {
        await Worker.findOneAndDelete({ userId: ctx.from.id });
        ctx.deleteMessage();
        ctx.scene.enter("register:main");
    } catch (error) {
        console.log(error);
    };
});

scene.hears("👤 Ro'yxatdan o'tish", (ctx) => ctx.scene.enter("register:role"));

module.exports = scene;