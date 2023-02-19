const { Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('myTimes');
const Worker = require("../models/Worker");

scene.enter(async (ctx) => {
    const worker = await Worker.findOne({ userId: ctx.from.id });
    const days = [];
    worker.time.days.forEach((item) => {
        const localDATE = new Date(item.date).toLocaleDateString();
        if ((item.date - Date.now()) < (3600 * 1000 * 24 * 7) && (item.date - Date.now()) > 0) {
            days.push({ local: localDATE, date: item.date });
        };
    });
    const keyboard = Markup.inlineKeyboard(days.map((item) => [Markup.button.callback(item.local, "takedate_" + item.date)]));
    ctx.reply("Sizning vaqtlaringiz:", keyboard);
});

scene.action(/^takedate_(.+)$/, (ctx) => {
    ctx.reply(ctx.match[1]);
});

module.exports = scene;