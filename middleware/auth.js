const Worker = require("../models/Worker");
const User = require("../models/User");

module.exports = async (ctx, next) => {
    try {
        const worker = await Worker.findOne({ userId: ctx.from.id });
        const user = await User.findOne({ userId: ctx.from.id });
        if (worker?.confirmed || user) {
            if (worker?.confirmed) ctx.state.worker = worker;
            if (user) ctx.state.user = user;
            next();
        } else {
            ctx.scene.enter("register:main");
        };
    } catch (error) {
        console.log(error);
    };
};