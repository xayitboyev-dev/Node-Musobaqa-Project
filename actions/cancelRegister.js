const Worker = require("../models/Worker");

module.exports = async (ctx) => {
    try {
        const id = parseInt(ctx.match[1]);
        const deleted = await Worker.findOneAndDelete({ userId: id });
        ctx.deleteMessage();
        ctx.answerCbQuery("Successfully deleted", { show_alert: true });
        console.log(deleted);
    } catch (error) {
        console.log(error);
    };
};