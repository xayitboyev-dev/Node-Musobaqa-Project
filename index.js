const connect = require('./utils/mongo');
const bot = require("./core/bot");
require('./admin/actions/admin')
const stage = require("./scenes/index");
const { MONGO_URI } = require("./config/config.json");
const auth = require("./middleware/auth");

// bot.use(auth);
bot.use(stage.middleware());
bot.use(ctx => ctx.scene.enter("register:main"));

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