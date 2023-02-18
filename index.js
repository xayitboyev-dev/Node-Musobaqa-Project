// const connect = require('./helper/database');
const bot = require("./core/bot");
const stage = require("./scenes/index");
const start = require("./utils/start");

bot.use(stage.middleware());
bot.use(ctx => ctx.scene.enter("main"));

async function startBot() {
    try {
        // await connect();
        // console.log("Connected to database.");
        // require("./core/webhook");
        bot.launch();
    } catch (error) {
        console.log(error);
        process.exit(0);
    };
};

startBot();