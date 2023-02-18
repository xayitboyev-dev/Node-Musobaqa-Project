const { Scenes: { WizardScene } } = require("telegraf");

const register = new WizardScene('register:customer',
    async (ctx) => {
        ctx.reply("Ismizngiz?");
        ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.name = ctx.message.text;
        ctx.reply("Telefon raqam?");
        ctx.wizard.next();
    },
    async (ctx) => {
        ctx.wizard.state.phone = ctx.message.text;
        ctx.reply(`Ism: ${ctx.wizard.state.name}\nTelefon: ${ctx.wizard.state.phone}`);
    },
);

module.exports = register;