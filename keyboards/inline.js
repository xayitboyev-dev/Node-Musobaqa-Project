const { Markup } = require("telegraf");

exports.confirm = Markup.inlineKeyboard([
    Markup.button.callback("✅ Tasdiqlash", "confirm")
])