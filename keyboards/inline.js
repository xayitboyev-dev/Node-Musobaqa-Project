const { Markup } = require("telegraf");

exports.edit = (action) => Markup.inlineKeyboard([
    [Markup.button.callback("🖊 Tahrirlash", action)],
]).resize();

exports.confirmation = Markup.inlineKeyboard([
    [Markup.button.callback("✅ Tasdiqlash", "confirm"), Markup.button.callback("❌ Bekor qilish", "cancel")],
]);

exports.registerResult = Markup.inlineKeyboard([
    [Markup.button.callback("🔄 Tekshirish", "check"), Markup.button.callback("❌ Bekor qilish", "cancel")],
    [Markup.button.callback("👨‍💻 Admin bilan bog'lanish", "admin")],
]);

exports.adminConfirmation = (userId) => {
    console.log(userId);
    return Markup.inlineKeyboard([
        [Markup.button.callback("✅ Tasdiqlash", "conf_" + userId), Markup.button.callback("❌ Bekor qilish", "canc_" + userId)],
    ]);
};

exports.workerReview = (workerId) => Markup.inlineKeyboard([
    [Markup.button.callback("📍 Joylashuvi", "location_" + workerId), Markup.button.callback("🕝 Vaqt olish", "time_" + workerId)],
    // [Markup.button.callback("⭐️ Baholash", "rate_" + workerId)]
]); 