const connect = require('./utils/mongo');
const bot = require("./core/bot");
require('./admin/actions/admin')
const stage = require("./scenes/index");
const { MONGO_URI } = require("./config/config.json");
const auth = require("./middleware/auth");

bot.use(stage.middleware());
bot.hears("/admin", (ctx) => ctx.reply("Admin panelga ulgurmay qoldik. Sorry!"));
bot.action(/^conf_(.+)$/, require("./actions/confirmRegister"));
bot.action(/^canc_(.+)$/, require("./actions/cancelRegister"));
bot.action(/^replyTo_(.+)$/, (ctx) => { ctx.scene.enter("sendMessage", { userId: ctx.match[1], from: ctx.from.id }); ctx.answerCbQuery("Javob yozish") });
bot.use(auth);
bot.use((ctx) => ctx.scene.enter("main"));

process.on("uncaughtException", (err) => {
    console.log(err);
})

async function startBot() {
    try {
        connect(MONGO_URI);
        bot.launch();
        console.log("Bot started.");
    } catch (error) {
        console.log(error);
        process.exit(0);
    };
};

startBot();