const { Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('register:main');
const { register, variants } = require('../../keyboards/button');

scene.enter(async (ctx) => {
    ctx.reply("Change Team botiga xush kelibsiz! \n\nBiz mijoz va ishchilarni online topishga yordam beramiz!", register);
});

scene.hears("👤 Ro'yxatdan o'tish", (ctx) => {
    ctx.reply("🛍 Xurmatli foydalanuvchi botdan kim bo'lib ro'yxatdan o'tmoqchi ekanligizni tanlang", variants);
});


module.exports = scene;