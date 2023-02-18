const { Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('register:type');
const { type } = require('../../keyboards/button');

scene.enter(async (ctx) => {
    ctx.reply("Qaysi foydanalanuvchi sifatida ro'yxatdan o'tmoqchisiz?", type);
});

scene.use(ctx => ctx.scene.reenter());

module.exports = scene;