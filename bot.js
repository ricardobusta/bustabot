const telegramCommands = require('./telegram_commands')

module.exports = {
    handleRequest: function (reqBody) {
        console.log("Message: " + reqBody.message.text);
        telegramCommands.sendMessage(reqBody.message.chat.id,
            "Mensagem: "+reqBody.message.text);
    }
}