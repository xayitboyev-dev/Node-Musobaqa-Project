const Worker = require("../models/Worker");

module.exports = async (ctx, next) => {
    try {
        const user = await Worker.findOne({ userId: ctx.from.id });
        if (user?.confirmed) {
            next();
        } else {
            ctx.scene.enter("register:main");
        };
    } catch (error) {
        console.log(error);
    };
};