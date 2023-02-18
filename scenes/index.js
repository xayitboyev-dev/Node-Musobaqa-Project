const { Scenes: { Stage } } = require('telegraf');

const stage = new Stage([
    require("./register/main"),
    require("./register/user"),
    require("./register/worker"),
    require("./register/role"),
    require("./services"),
    require("./main")
]);

module.exports = stage;