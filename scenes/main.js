const { Markup, Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('main');
const Category = require("../models/Category");

scene.enter(async (ctx) => {
    const categories = await Category.find();
    const keyboard = Markup.keyboard(categories.map((item) => [item.name])).resize();
    ctx.reply("🔝 Asosiy menyu", keyboard);
});

module.exports = scene;