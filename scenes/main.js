const { Markup, Scenes: { BaseScene } } = require('telegraf');
const scene = new BaseScene('main');
const Worker = require("../models/Worker");
const User = require("../models/User");
const { workerMain, userMain } = require("../keyboards/button");
const { edit, selectedView, sendMsg } = require("../keyboards/inline");

scene.enter(async (ctx) => {
    if (ctx.scene.state.from === "edit") ctx.state.worker = "edit";
    ctx.reply("🔝 Asosiy menyu", ctx.state.worker ? workerMain : userMain);
});

scene.hears("Ma'lumotlarni o'zgartirish", async (ctx) => {
    const user = await Worker.findOne({ userId: ctx.from.id });
    if (user) {
        ctx.reply(`Role: ${user.role}\nIsm: ${user.name}\nTelefon: ${user.phone}${user.officeName ? "\nIshxona nomi: " + user.officeName : ""}\nManzil: ${user.place}\nMo'ljal: ${user.targetPlace}\nIshni boshlash: ${user.startWork}\nIshni yakunlash: ${user.endWork}\nHarbir mijoz uchun vaqt: ${user.timeToOne}\n`, edit("workerEdit"));
    } else {
        ctx.reply("Foydalanuvchi topilmadi!");
    };
});

scene.hears("Malumotlarni o'zgartirish", async (ctx) => {
    const user = await User.findOne({ userId: ctx.from.id });
    if (user) {
        ctx.reply(`Ism: ${user.name}\nTelefon: ${user.phone}`, edit("userEdit"));
    } else {
        ctx.reply("Foydalanuvchi topilmadi!");
    };
});

scene.hears("Xizmatlar", (ctx) => ctx.scene.enter("services"));

scene.hears("Vaqt", (ctx) => ctx.scene.enter("myTimes"));

scene.hears("Tanlangan xizmatlar", async (ctx) => {
    try {
        const selecteds = [];
        const workers = await Worker.find();
        workers.forEach((item) => {
            item.time.days.forEach((day) => {
                day.times.forEach((time) => {
                    if (time.receiver == ctx.from.id && time.status != "cancelled") {
                        selecteds.push({
                            date: day.date,
                            time: time.time,
                            worker: item
                        });
                    };
                })
            })
        });

        const inline = Markup.inlineKeyboard(selecteds.map((item) => [Markup.button.callback(`${new Date(item.date).toLocaleDateString()} - ${item.time} ${item.worker.name}`, "master_" + item.worker.userId)]));
        ctx.reply("Siz band qilgan masterlar:", inline);
    } catch (error) {
        console.log(error);
        ctx.scene.enter("main");
    };
});

scene.hears("Mijozlar", async (ctx) => {
    try {
        const customers = [];
        const worker = await Worker.findOne({ userId: ctx.from.id });

        worker.time.days.forEach((day) => {
            day.times.forEach((time) => {
                if (time.receiver && time.status != "cancelled") {
                    customers.push({
                        date: day.date,
                        time: time.time,
                        customerId: time.receiver
                    });
                };
            })
        });

        ctx.reply("Mijozlaringiz:", Markup.inlineKeyboard(customers.map((item) => [Markup.button.callback(`${new Date(item.date).toLocaleDateString()} - ${item.time}`, "customer_" + item.customerId)])));
    } catch (error) {
        console.log(error);
        ctx.scene.enter("main", { from: "edit" });
    };
});

scene.action(/^customer_(.+)$/, async (ctx) => {
    try {
        ctx.answerCbQuery("Mijoz");
        const customerId = parseInt(ctx.match[1]);
        const customer = await User.findOne({ userId: customerId });
        ctx.editMessageText(`Mijoz\n\nIsmi: ${customer.name}\nTelefon: ${customer.phone}`, sendMsg(customerId));
    } catch (error) {
        console.log(error);
    };
});

scene.action(/^master_(.+)$/, async (ctx) => {
    try {
        const worker = await Worker.findOne({ userId: ctx.match[1] });
        ctx.editMessageText(`Role: ${worker.role}\nIsm: ${worker.name}\nTelefon: ${worker.phone}${worker.officeName ? "\nIshxona nomi: " + worker.officeName : ""}\nManzil: ${worker.place}\nMo'ljal: ${worker.targetPlace}\nIshni boshlash: ${worker.startWork}\nIshni yakunlash: ${worker.endWork}\nHarbir mijoz uchun vaqt: ${worker.timeToOne}\n`, selectedView(worker.userId));
    } catch (error) {
        console.log(error);
    };
});

scene.action(/^location_(.+)$/, async (ctx) => {
    try {
        const worker = await Worker.findOne({ userId: ctx.match[1] });
        ctx.replyWithLocation(worker.location.latitude, worker.location.longitude);
        ctx.answerCbQuery("Location");
    } catch (error) {
        console.log(error);
    };
});

scene.action("workerEdit", (ctx) => {
    ctx.deleteMessage();
    ctx.scene.enter("register:worker", { from: "edit" });
});

scene.action("userEdit", (ctx) => {
    ctx.deleteMessage();
    ctx.scene.enter("register:user", { from: "edit" });
});

module.exports = scene;