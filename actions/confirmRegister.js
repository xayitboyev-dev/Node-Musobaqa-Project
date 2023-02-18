const Worker = require("../models/Worker");

module.exports = async (ctx) => {
    try {
        const id = parseInt(ctx.match[1]);
        const updated = await Worker.findOneAndUpdate({ userId: id }, { confirmed: true });
        ctx.deleteMessage();
        ctx.answerCbQuery("Successfully deleted", { show_alert: true });
        console.log(updated);
    } catch (error) {
        console.log(error);
    };
};