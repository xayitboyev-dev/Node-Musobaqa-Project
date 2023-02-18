const { Scenes: { WizardScene } } = require("telegraf");
const Category = require("../../models/Category");
const Worker = require("../../models/Worker");
const { Markup, Composer } = require("telegraf");
const { skip, remove, phone } = require("../../keyboards/button");
const { confirmation, adminConfirmation } = require("../../keyboards/inline");
const sendAdmins = require("../../utils/sendToAdmins");

const register = new WizardScene('register:worker',
    async (ctx) => {
        ctx.wizard.state.userId = ctx.from.id;
        const categories = await Category.find();
        const keyboard = Markup.keyboard(categories.map((item) => [item.name])).resize();
        ctx.reply("Mijozlarga qanday xizmat ko'rsatasiz?", keyboard);
        ctx.wizard.next();
    },
    async (ctx) => {
        const category = await Category.findOne({ name: ctx.message?.text });
        if (category?.name) {
            ctx.wizard.state.role = category.name;
            ctx.reply("Ismingizni kiriting:", remove);
            ctx.wizard.next();
        } else {
            ctx.reply("❗️ Iltimos quyida keltirilganlardan kiriting.");
        };
    },
    async (ctx) => {
        ctx.wizard.state.name = ctx.message?.text;
        ctx.reply("Telefon raqamingizni kiriting (+998):", phone);
        ctx.wizard.next();
    },
    async (ctx) => {
        let number = ctx.message?.contact?.phone_number || (parseInt(ctx.message?.text).toString());
        if (number && (number.slice(0, 4) === "+998" || number.slice(0, 3) === "998")) {
            ctx.wizard.state.phone = number;
            ctx.reply("Ishxonangiz nomini kiriting (ixtiyoriy):", skip);
            ctx.wizard.next();
        } else {
            ctx.reply("❗️ Iltimos telefon raqamni to'gri kiriting.");
        };
    },
    async (ctx) => {
        if (ctx.message?.text !== "➡️ Tashlab ketish") {
            ctx.wizard.state.officeName = ctx.message?.text;
        };
        ctx.reply("Ishxonangiz manzilini kiriting:", remove);
        ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message?.text) {
            ctx.wizard.state.place = ctx.message?.text;
            ctx.reply("Joylashuv yuboring:");
            ctx.wizard.next();
        } else {
            ctx.reply("❗️ Iltimos ishxonangiz manzilini to'gri kiriting.");
        };
    },
    async (ctx) => {
        if (ctx.message?.location) {
            ctx.wizard.state.location = { latitude: ctx.message?.location?.latitude, longitude: ctx.message?.location?.longitude };
            ctx.reply("Ishxonangiz mo'ljalini kiriting:");
            ctx.wizard.next();
        } else {
            ctx.reply("❗️ Noto'g'ri joylashuv.");
        };
    },
    async (ctx) => {
        if (ctx.message?.text) {
            ctx.wizard.state.targetPlace = ctx.message?.text;
            ctx.reply("Ishni boshlash vaqtingizni kiriting (namuna: 09:30):");
            ctx.wizard.next();
        } else {
            ctx.reply("❗️ Iltimos to'gri kiriting.");
        };
    },
    async (ctx) => {
        if (ctx.message?.text) {
            ctx.wizard.state.startWork = ctx.message?.text;
            ctx.reply("Ishni yakunlash vaqtingizni kiriting: (namuna: 18:00)");
            ctx.wizard.next();
        } else {
            ctx.reply("❗️ Iltimos to'gri kiriting.");
        };
    },
    async (ctx) => {
        if (ctx.message?.text) {
            ctx.wizard.state.endWork = ctx.message?.text;
            ctx.reply("HAR BIR MIJOZ UCHUN O’RTACHA SARFLANADIGAN VAQT: (namuna: 30 min)");
            ctx.wizard.next();
        } else {
            ctx.reply("❗️ Iltimos to'gri kiriting.");
        };
    },
    async (ctx) => {
        if (ctx.message?.text) {
            ctx.wizard.state.timeToOne = ctx.message?.text;
            ctx.wizard.state.result = `Role: ${ctx.wizard.state.role}\nIsm: ${ctx.wizard.state.name}\nTelefon: ${ctx.wizard.state.phone}${ctx.wizard.state.officeName ? "\nIshxona nomi: " + ctx.wizard.state.officeName : ""}\nManzil: ${ctx.wizard.state.place}\nMo'ljal: ${ctx.wizard.state.targetPlace}\nIshni boshlash: ${ctx.wizard.state.startWork}\nIshni yakunlash: ${ctx.wizard.state.endWork}\nHarbir mijoz uchun vaqt: ${ctx.wizard.state.timeToOne}\n`;
            ctx.reply(ctx.wizard.state.result, confirmation);
            ctx.wizard.next();
        } else {
            ctx.reply("❗️ Iltimos to'gri kiriting.");
        };
    },
    Composer.action(/cancel|confirm/gi, async (ctx) => {
        if (ctx.match[0] === "cancel") {
            ctx.wizard.state = {};
            ctx.scene.enter("register:main");
        } else if (ctx.match[0] === "confirm") {
            try {
                await Worker.create(ctx.wizard.state);
                sendAdmins("#yangi_ishchi\n\n" + ctx.wizard.state.result, adminConfirmation(ctx.from.id));
                ctx.deleteMessage();
                ctx.scene.enter("register:main");
            } catch (error) {
                console.log(error);
                ctx.scene.enter("register:main");
            };
        };
    }),
);



module.exports = register;