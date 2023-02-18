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
