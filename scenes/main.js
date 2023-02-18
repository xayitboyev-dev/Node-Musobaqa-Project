const { Markup, Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('main');
const Worker = require("../models/Worker");
const User = require("../models/User");
const { workerMain, userMain } = require("../keyboards/button");
const { edit } = require("../keyboards/inline");
const Category = require('../models/Category');

// const keyboard = Markup.keyboard(categories.map((item) => [item.name])).resize();

scene.enter(async (ctx) => {
    if (ctx.scene.state.from === "edit") ctx.state.worker = "edit";
    ctx.reply("🔝 Asosiy menyu", ctx.state.worker ? workerMain : userMain);
});

scene.hears("Ma'lumotlarni o'zgartirish", async (ctx) => {
    const user = await Worker.findOne({ userId: ctx.from.id });
    if (user) {
        ctx.reply(`Role: ${user.role}\nIsm: ${user.name}\nTelefon: ${user.phone}${user.officeName ? "\nIshxona nomi: " + user.officeName : ""}\nManzil: ${user.place}\nMo'ljal: ${user.targetPlace}\nIshni boshlash: ${user.startWork}\nIshni yakunlash: ${user.endWork}\nHarbir mijoz uchun vaqt: ${user.timeToOne}\n`, edit("workerEdit"));
    } else {
        ctx.reply("Foydalanuvchi topilmadi!");
    };
});

scene.hears("Malumotlarni o'zgartirish", async (ctx) => {
    const user = await User.findOne({ userId: ctx.from.id });
    if (user) {
        ctx.reply(`Ism: ${user.name}\nTelefon: ${user.phone}`, edit("userEdit"));
    } else {
        ctx.reply("Foydalanuvchi topilmadi!");
    };
});

scene.hears("Xizmatlar", (ctx) => ctx.scene.enter("services"));

scene.action("workerEdit", (ctx) => {
    ctx.deleteMessage();
    ctx.scene.enter("register:worker", { from: "edit" });
});

scene.action("userEdit", (ctx) => {
    ctx.deleteMessage();
    ctx.scene.enter("register:user", { from: "edit" });
});

module.exports = scene;