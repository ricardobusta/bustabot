const telegramCommands = require('./telegram_commands');
const roll_command = require('../bot_commands/roll');
const attr_command = require('../bot_commands/attributes');
const bot_name = "@BustaBot";

var commands = [roll_command, attr_command];

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
            for (var i in commands) {
                var command = commands[i];
                console.log("Command: " + command);
                helpString += "/" + command.key + " - " + command.help + "\n";
            }

            console.log(helpString);

            telegramCommands.sendMessage(
                reqBody.message.chat.id,
                helpString);
            return;
        }

        var splitMessage = message.split("\s+");

        for (var i in commands) {
            var command = commands[i];
            if (splitMessage[0] == "/" + command.key || splitMessage[0].startsWith("/" + command.key + bot_name)) {
                telegramCommands.sendMessage(
                    reqBody.message.chat.id,
                    "Command Ok: " + command);
            }
        }

        console.log("Another command: " + splitMessage);
    }
}