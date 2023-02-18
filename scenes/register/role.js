const { Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('register:role');
const { role } = require('../../keyboards/button');

scene.enter(async (ctx) => {
    ctx.reply("Botdan qay turdagi foydanaluvchi sifatida foydalanmoqchisiz?", role);
});

scene.hears("Usta", async (ctx) => {
    ctx.scene.enter("register:worker");
});

scene.hears("Mijoz", async (ctx) => {
    ctx.scene.enter("register:user");
});

module.exports = scene; 