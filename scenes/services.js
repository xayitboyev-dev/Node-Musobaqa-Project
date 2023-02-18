const { Markup, Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('services');
const Category = require("../models/Category");
const Worker = require("../models/Worker");

scene.enter(async (ctx) => {
    try {
        const categories = await Category.find();
        const keyboard = Markup.keyboard(categories.map((item) => [item.name]));
        ctx.reply("⚡️ Xizmatlar:", keyboard);
    } catch (error) {
        console.log(error);
    };
});

scene.on("text", async (ctx) => ctx.scene.enter("findType"));

module.exports = scene;