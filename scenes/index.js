const { Scenes: { Stage } } = require('telegraf');

const stage = new Stage([
    require("./register"),
]);

module.exports = stage;