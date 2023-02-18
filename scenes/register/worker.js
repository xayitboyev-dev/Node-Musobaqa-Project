const { Scenes: { WizardScene } } = require("telegraf");
const Category = require("../../models/category");
const { Markup } = require("telegraf");
const { skip } = require("../../keyboards/button");
const { confirm } = require("../../keyboards/inline");

const register = new WizardScene('register:worker',
    async (ctx) => {
        const categories = await Category.find();
        const keyboard = Markup.keyboard(categories.map((item) => [item.name])).resize();
        ctx.reply("Mijozlarga qanday xizmat ko'rsatasiz?", keyboard);
        ctx.wizard.next();
    },
    async (ctx) => {
        const category = await Category.findOne({ name: ctx.message?.text });
        if (category?.name) {
            ctx.wizard.state.role = category.name;
            ctx.reply("Ismingizni kiriting:");
            ctx.wizard.next();
        } else {
            ctx.reply("❗️ Iltimos quyida keltirilganlardan kiriting.");
        };
    },
    async (ctx) => {
        ctx.wizard.state.name = ctx.message?.text;
        ctx.reply("Telefon raqamingizni kiriting (+998):");
        ctx.wizard.next();
    },
    async (ctx) => {
        let number = parseInt(ctx.message?.text).toString();
        if (number && (number.slice(0, 4) === "+998" || number.slice(0, 3) === "998")) {
            ctx.wizard.state.phone = ctx.message?.text;
            ctx.reply("Ustaxonangiz nomini kiriting (ixtiyoriy):", skip);
            ctx.wizard.next();
        } {
            ctx.reply("❗️ Iltimos telefon raqamni to'gri kiriting.");
        };
    },
    async (ctx) => {
        if (ctx.message?.text) {
            ctx.wizard.state.officeName = ctx.message?.text;
            ctx.reply("Ishxonangiz manzilini kiriting:");
            ctx.wizard.next();
        } else {
            ctx.reply("❗️ Iltimos ustaxonangiz nomini to'gri kiriting.");
        };
    },
    async (ctx) => {
        if (ctx.message?.text) {
            ctx.wizard.state.place = ctx.message?.text;
            ctx.reply("Ishxonangiz mo'ljalini kiriting:");
            ctx.wizard.next();
        } else {
            ctx.reply("❗️ Iltimos ishxonangiz manzilini to'gri kiriting.");
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
            ctx.reply(`Role: ${ctx.wizard.state.role}\nIsm: ${ctx.wizard.state.name}\nTelefon: ${ctx.wizard.state.role}\nUstaxona nomi: ${ctx.wizard.state.officeName}\nManzil: ${ctx.wizard.state.place}\nMo'ljal: ${ctx.wizard.state.targetPlace}\nIshni boshlash: ${ctx.wizard.state.startWork}\nIshni yakunlash: ${ctx.wizard.state.endWork}\nHarbir mijoz uchun vaqt: ${ctx.wizard.state.timeToOne}\n`, confirm);
        } else {
            ctx.reply("❗️ Iltimos to'gri kiriting.");
        };
    }
);

module.exports = register;