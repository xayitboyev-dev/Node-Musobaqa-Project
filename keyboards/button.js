const { Markup } = require('telegraf');

exports.register = Markup.keyboard([
    ["👤 Ro'yxatdan o'tish"]
]).resize();

exports.role = Markup.keyboard([
    ["Usta", "Mijoz"]
]).resize();

exports.skip = Markup.keyboard([
    ["➡️ Tashlab ketish"]
]).resize();

exports.back = Markup.keyboard([
    ["🔙 Orqaga qaytish"]
]).resize();

exports.findType = Markup.keyboard([
    ["Joylashuvi"],
]).resize();

exports.phone = Markup.keyboard([
    Markup.button.contactRequest("📱 Raqamni yuborish")
]).resize();

exports.location = Markup.keyboard([
    Markup.button.locationRequest("📍 Joylashuvni yuborish")
]).resize();

exports.workerMain = Markup.keyboard([
    ["Mijozlar", "Vaqt"],
    ["Ma'lumotlarni o'zgartirish"]
]).resize();

exports.userMain = Markup.keyboard([
    ["Xizmatlar", "Tanlangan xizmatlar"],
    ["Malumotlarni o'zgartirish"]
]).resize();

exports.remove = Markup.removeKeyboard();