const { Markup, Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('findType');
const Worker = require("../models/Worker");
const User = require("../models/User");
const bot = require("../core/bot");
const { findType, location } = require("../keyboards/button");
const { workerReview } = require("../keyboards/inline");

scene.enter(async (ctx) => {
    try {
        ctx.reply("Qidirish turi:", findType);
    } catch (error) {
        console.log(error);
    };
});

scene.hears("Joylashuvi", async (ctx) => {
    ctx.reply("Joylashuvingizni yuboring va sizga eng yaqin bo'lgan masterlarni taqdim etamiz!", location);
});

scene.on("location", async (ctx) => {
    const workers = JSON.parse(JSON.stringify((await Worker.find())));
    const filter = getNearest(workers, ctx.message.location);
    const mapped = filter.map((item) => [`${item.name} ${item.place}`])
    mapped.unshift(["🔙 Orqaga qaytish"]);
    ctx.scene.state.filterWorkers = filter;
    const keyboard = Markup.keyboard(mapped).resize();
    ctx.reply("Sizga eng yaqindagi masterlar: ", keyboard);
});

scene.hears("🔙 Orqaga qaytish", (ctx) => {
    ctx.scene.enter("main");
});

scene.on("text", async (ctx) => {
    try {
        const worker = ctx.scene.state.filterWorkers.find((item) => `${item.name} ${item.place}` === ctx.message?.text);
        ctx.scene.state.worker = worker;
        ctx.reply(`Role: ${worker.role}\nIsm: ${worker.name}\nTelefon: ${worker.phone}${worker.officeName ? "\nIshxona nomi: " + worker.officeName : ""}\nManzil: ${worker.place}\nMo'ljal: ${worker.targetPlace}\nIshni boshlash: ${worker.startWork}\nIshni yakunlash: ${worker.endWork}\nHarbir mijoz uchun vaqt: ${worker.timeToOne}\n`, workerReview(worker.userId));
    } catch (error) {
        console.log(error);
    };
});

scene.action(/^location_(.+)$/, async (ctx) => {
    const worker = await Worker.findOne({ userId: ctx.match[1] });
    const { location: { latitude, longitude } } = worker;
    ctx.answerCbQuery("Location");
    ctx.replyWithLocation(latitude, longitude);
});

scene.action(/^time_(.+)$/, async (ctx) => {
    const worker = await Worker.findOne({ userId: ctx.match[1] });
    ctx.scene.state.worker = worker;
    const days = [];

    worker.time.days.forEach((item) => {
        const localDATE = new Date(item.date).toLocaleDateString();
        if ((item.date - Date.now()) < (3600 * 1000 * 24 * 7) && (item.date - Date.now()) > 0) {
            days.push({ local: localDATE, date: item.date });
        };
    });

    ctx.editMessageText("Qaysi kunga bo'sh qilmoqchisiz?", Markup.inlineKeyboard(days.map((item) => [Markup.button.callback(item.local, "takedate_" + item.date)])))
});

scene.action(/^takedate_(.+)$/, async (ctx) => {
    const date = parseInt(ctx.match[1]);
    getTimes(ctx, date);
});

scene.action(/^selecttime_(.+)$/, async (ctx) => {
    try {
        const _id = ctx.match[1];
        const worker = await Worker.findOne({ userId: ctx.scene.state.worker.userId });
        const user = await User.findOne({ userId: ctx.from.id });
        const index = worker.time.days.findIndex(item => item.date == ctx.scene.state.date);
        const times = worker.time.days[index].times;
        const timeIndex = times.findIndex(item => item._id == _id);
        if (worker.time.days[index].times[timeIndex].receiver) {
            if (worker.time.days[index].times[timeIndex].receiver == ctx.from.id) {
                worker.time.days[index].times[timeIndex].receiver = null;
                worker.time.days[index].times[timeIndex].status = null;
                ctx.answerCbQuery("Bekor qilindi!");
                await worker.save();
                getTimes(ctx, ctx.scene.state.date);
            } else {
                ctx.answerCbQuery("Boshqa mijoz tomonidan band qilingan!");
            };
        } else {
            worker.time.days[index].times[timeIndex].receiver = ctx.from.id;
            worker.time.days[index].times[timeIndex].status = "busy";
            ctx.answerCbQuery("Band qilindi!");
            await worker.save();
            bot.telegram.sendMessage(worker.userId, `${new Date(ctx.scene.state.date).toLocaleDateString()} ${worker.time.days[index].times[timeIndex].time} vaqtiga band qilindingiz!\n\nMijoz ismi: ${user.name}\nMijoz telefoni: ${user.phone}`);
            getTimes(ctx, ctx.scene.state.date);
        };
    } catch (error) {
        console.log(error);
        ctx.scene.enter("main");
    };
});

scene.use((ctx) => {
    console.log("unhandled useing");
})

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

function getNearest(workers, myLoc) {
    let res = [];

    workers.forEach((item) => {
        let lat = 0;
        if (item.location.latitude > myLoc.latitude) lat = item.location.latitude - myLoc.latitude;
        else lat = myLoc.latitude - item.location.latitude;
        let lot = 0;
        if (item.location.longitude > myLoc.longitude) lot = item.location.longitude - myLoc.longitude;
        else lot = myLoc.longitude - item.location.longitude;
        res.push({ ...item, lat, lot });
    });

    return res.sort(function (a, b) { return (a.lat + a.lot) - (b.lat + b.lot) });
};

module.exports = scene;