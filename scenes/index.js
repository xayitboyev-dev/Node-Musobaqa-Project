const { Scenes: { Stage } } = require('telegraf');

const stage = new Stage([
    require("./register/main"),
]);

module.exports = stage;