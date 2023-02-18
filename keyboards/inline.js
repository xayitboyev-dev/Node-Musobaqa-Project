const { Markup } = require("telegraf");

exports.confirmation = Markup.inlineKeyboard([
    [Markup.button.callback("✅ Tasdiqlash", "confirm"), Markup.button.callback("❌ Bekor qilish", "cancel")],
]);

exports.registerResult = Markup.inlineKeyboard([
    [Markup.button.callback("🔄 Tekshirish", "check"), Markup.button.callback("❌ Bekor qilish", "cancel")],
    [Markup.button.callback("👨‍💻 Admin bilan bog'lanish", "admin")],
]);