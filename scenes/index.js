const { Scenes: { Stage } } = require('telegraf');

const stage = new Stage([
    require("./register/main"),
    require("./register/customer"),
    require("./register/worker"),
    require("./register/role"),
]);

module.exports = stage;