const telegramCommands = require("../bot_core/telegram_commands");

module.exports = {
    keys: ["musica"],
    description: "Musica link do YouTube(não sei se dá pra o bot add ela numa Playlist do YouTube) ",
    execute: function (key, params, req) {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            "Musica.");
    }
}