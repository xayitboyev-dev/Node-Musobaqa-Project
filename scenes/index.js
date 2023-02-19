const { Scenes: { Stage } } = require('telegraf');

const stage = new Stage([
    require("./register/main"),
    require("./register/user"),
    require("./register/worker"),
    require("./register/role"),
    require("./sendMessage"),
    require("./services"),
    require("./findType"),
    require("./myTimes"),
    require("./main")
]);

module.exports = stage;