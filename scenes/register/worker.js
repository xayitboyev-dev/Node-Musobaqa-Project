const { Scenes: { WizardScene } } = require("telegraf");

const register = new WizardScene('register:worker',
    async (ctx) => {
        ctx.reply("Ish:");
        ctx.wizard.next();
    },
    async (ctx) => {
        ctx.reply("Telefon:");
        ctx.wizard.next();
    },
    async (ctx) => {
        ctx.reply("Soatlik ish:");
        ctx.wizard.next();
    },
);

module.exports = register;