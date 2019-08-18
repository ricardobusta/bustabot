const telegramCommands = require('../bot_core/telegram_commands');

const phrases = [
    "TÁ SAINDO DA JAULA, O <b>MONSTRO</b>!",
    "<b>BIIIIRRRLLL</b>!!!",
    "É 37 ANOS <b>PORRA</b>!",
    "AQUI É <b>BODYBUILDER</b>, PORRA!",
    "SAÍ DE CASA, COMI PRA CARALHO!",
    "QUE NÃO VAI DAR, RAPAZ?",
    "O MUTANTE CHEGOU!",
    "É HORA DO SHOW, <b>PORRA</b>!"
];

module.exports = {
    keys: ["birl"],
    description: "Birl.",
    execute: function (params, req) {
        let index = Math.floor(Math.random() * phrases.length);

        telegramCommands.sendMessage(req.message.chat.id, phrases[index]);
    }
}