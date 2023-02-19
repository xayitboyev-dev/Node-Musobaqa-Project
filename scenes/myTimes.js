const { Markup, Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('myTimes');
const Worker = require("../models/Worker");

scene.enter(async (ctx) => {
    const worker = await Worker.findOne({ userId: ctx.from.id });
    ctx.scene.state.worker = worker;
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
    getTimes(ctx, ctx.match[1]);
});


scene.action(/^selecttime_(.+)$/, async (ctx) => {
    try {
        const _id = ctx.match[1];
        const worker = await Worker.findOne({ userId: ctx.from.id });
        const index = worker.time.days.findIndex(item => item.date == ctx.scene.state.date);
        const times = worker.time.days[index].times;
        const timeIndex = times.findIndex(item => item._id == _id);
        if (worker.time.days[index].times[timeIndex].status == "cancelled") {
            worker.time.days[index].times[timeIndex].status = "empty";
        } else {
            worker.time.days[index].times[timeIndex].status = "cancelled";
            worker.time.days[index].times[timeIndex].receiver = null;
        };
        await worker.save();
        getTimes(ctx, ctx.scene.state.date);
        getTimes(ctx, ctx.scene.state.date);
    } catch (error) {
        console.log(error);
        ctx.scene.enter("main");
    };
});

async function getTimes(ctx, date) {
    try {
        const worker = await Worker.findOne({ userId: ctx.scene.state.worker.userId });
        const index = worker.time.days.findIndex(item => item.date == date);
        const times = worker.time.days[index].times;
        const keyboard = Markup.inlineKeyboard(times.map((item) => {
            if (item.receiver && item.receiver == ctx.from.id) {
                return [Markup.button.callback(item.time + " " + "✅", "selecttime_" + item._id)];
            } else if (item.receiver && item.receiver != ctx.from.id) {
                return [Markup.button.callback(item.time + " " + "☑️", "selecttime_" + item._id)];
            } else if (item.status && item.status == "cancelled") {
                return [Markup.button.callback(item.time + " " + "❌", "selecttime_" + item._id)];
            } else {
                return [Markup.button.callback(item.time, "selecttime_" + item._id)];
            };
        }));
        ctx.scene.state.date = date;
        await ctx.editMessageText(new Date(date).toLocaleDateString() + " kunida qaysi vaqtga band qilmoqchisiz?", keyboard);
    } catch (error) {
        console.log(error);
    };
};

module.exports = scene; 