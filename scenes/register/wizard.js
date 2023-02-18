const { Scenes: { Stage, WizardScene } } = require("telegraf");

const register = new WizardScene('register:wizard',
    async (ctx) => {
        ctx.reply("Ism:");
    },
    async (ctx) => {
        ctx.reply("Ish:");
    },
    async (ctx) => {
        ctx.reply("Telefon:");
    },
    async (ctx) => {
        ctx.reply("Soatlik ish:");
    },
);

module.exports = register;