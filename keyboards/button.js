const { Markup } = require('telegraf');

exports.register = Markup.keyboard([
    ["👤 Ro'yxatdan o'tish"]
]).resize();

exports.variants = Markup.keyboard([
    ["👷‍♂️ Usta", "👤 Mijoz"]
]).resize()


