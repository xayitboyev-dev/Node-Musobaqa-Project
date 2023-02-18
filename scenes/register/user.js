const { Composer, Scenes: { WizardScene } } = require("telegraf");
const { confirmation } = require("../../keyboards/inline");
const { remove, phone } = require("../../keyboards/button");
const User = require("../../models/User");

const register = new WizardScene('register:user',
    async (ctx) => {
        ctx.reply("Ismingizni kiriting:", remove);
        ctx.wizard.next();
    },
    async (ctx) => {
        if (ctx.message?.text) {
            ctx.wizard.state.name = ctx.message?.text;
            ctx.reply("Telefon raqamingizni kiriting:", phone);
            ctx.wizard.next();
        } else {
            ctx.reply("Iltimos ismingizni to'g'ri kiriting!");
        };
    },
    async (ctx) => {
        const phone = ctx.message?.contact?.phone_number || ctx.message?.text;
        if (phone) {
            ctx.wizard.state.phone = phone;
            ctx.reply(`Ism: ${ctx.wizard.state.name}\nTelefon: ${ctx.wizard.state.phone}`, confirmation);
            ctx.wizard.next();
        } else {
            ctx.reply("Iltimos telefon raqamingizni to'g'ri kiriting!");
        };
    },
    Composer.action(/cancel|confirm/gi, async (ctx) => {
        if (ctx.wizard.state.from === "edit") {
            if (ctx.match[0] === "cancel") {
                ctx.deleteMessage();
                ctx.scene.enter("main");
            } else if (ctx.match[0] === "confirm") {
                const user = await User.findOneAndUpdate({ userId: ctx.from.id }, ctx.wizard.state);
                ctx.deleteMessage();
                ctx.scene.enter("main");
            };
        } else {
            if (ctx.match[0] === "cancel") {
                ctx.deleteMessage();
                ctx.scene.enter("register:main");
            } else if (ctx.match[0] === "confirm") {
                const user = await User.create({ name: ctx.wizard.state.name, phone: ctx.wizard.state.phone, userId: ctx.from.id });
                console.log(user);
                ctx.deleteMessage();
                ctx.scene.enter("main");
            };
        };
    }),
);

module.exports = register;