const telegramCommands = require('./telegram_commands');

const bot_name = "@BustaBot";

const coin_command = require('../bot_commands/coin_command');
const grito_command = require('../bot_commands/grito_command');
const guess_command = require('../bot_commands/guess_command');
const mata_command = require('../bot_commands/mata_command');
const roll_command = require('../bot_commands/roll_command');
const versus_command = require('../bot_commands/versus_command');

var commands = [
    require('../bot_commands/attr_command'), 
    require('../bot_commands/benedict_command'), 
    require('../bot_commands/birl_command'),
];

function printHelpCommand(reqBody){
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
}

module.exports = {
    handleRequest: function (reqBody) {
        var message = reqBody.message.text;
        if (!message.startsWith("/")) {
            return;
        }

        if (message == "/help" || message.startsWith("/help ")) {
            printHelpCommand(reqBody);
        }

        var splitMessage = message.split("\s+");

        for (var i in commands) {
            var command = commands[i];
            if (splitMessage[0] == "/" + command.key || splitMessage[0].startsWith("/" + command.key + bot_name)) {
                command.execute(splitMessage, reqBody);
                return;
            }
        }

        printHelpCommand(reqBody);
    }
}