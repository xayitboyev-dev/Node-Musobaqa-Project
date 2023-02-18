const { Markup, Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('findType');
const Worker = require("../models/Worker");
const { findType, location } = require("../keyboards/button");

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
    console.log(filter);
    const keyboard = Markup.keyboard(filter.map((item) => [`${item.name} ${item.place}`]));
    ctx.reply("Masterlar: ", keyboard);
});

// scene.on("text", async (ctx) => {
//     const workers = await Worker.find({ role: ctx.message?.text });
//     const keyboard = Markup.keyboard(workers.map((item) => [`${item.name} ${item.place}`]))
//     ctx.reply(ctx.message.text + "xizmatlari: ", keyboard);
// });

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