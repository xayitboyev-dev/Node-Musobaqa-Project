const { Markup } = require('telegraf');

exports.register = Markup.keyboard([
    ["👤 Ro'yxatdan o'tish"]
]).resize();

exports.type = Markup.keyboard([
    ["USTA", "Mijoz"]
]);