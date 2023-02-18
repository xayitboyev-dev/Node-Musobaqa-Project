const { Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('register:main');
const { register } = require('../../keyboards/button');
const wizard = require("./wizard");

scene.enter(async (ctx) => {
    ctx.reply("Change Team botiga xush kelibsiz! \n\nBiz mijoz va ishchilarni online topishga yordam beramiz!", register);
});

scene.hears("👤 Ro'yxatdan o'tish", (ctx)=> ctx.scene.enter("register:wizard"));

// scene.use(ctx => ctx.scene.reenter());

module.exports = scene; 