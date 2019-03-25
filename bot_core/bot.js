const telegramCommands = require('./telegram_commands');
const roll_command = require('../bot_commands/roll');

commands = [roll_command];

module.exports = {
    handleRequest: function (reqBody) {
        var message = reqBody.message.text;
        if (!message.startsWith("/")) {
            console.log("Not a command!");
            return;
        }

        if (message == "/help" || message.startsWith("/help ")) {
            console.log("Logging Help!");
            var helpString = "BustaBot Help:\n";
            for (var command in commands) {
                helpString += "/" + command.key + " - " + command.help + "\n";
            }

            console.log(helpString);

            telegramCommands.sendMessage(
                reqBody.message.chat.id,
                helpString);
            return;
        }

        console.log("Another command: " + message);
    }
}