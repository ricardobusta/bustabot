const telegramCommands = require('./telegram_commands');

const bot_name = "@BustaBot";

var commands = [
    require('../bot_commands/attr_command'), 
    require('../bot_commands/benedict_command'), 
    require('../bot_commands/birl_command'),
    require('../bot_commands/coin_command'),
    require('../bot_commands/grito_command'),
    require('../bot_commands/guess_command'),
    require('../bot_commands/mata_command'),
    require('../bot_commands/roll_command'),
    require('../bot_commands/versus_command'),
];

function printHelpCommand(reqBody){
    console.log("Logging Help!");
    var helpString = "<b>BustaBot Help:</b>\n";
    for (var i in commands) {
        var command = commands[i];
        helpString += "/" + command.keys[0] + " - " + command.description + "\n";
    }

    telegramCommands.sendMessage(
        reqBody.message.chat.id,
        helpString);
}

function printCommandList(reqBody){
    console.log("Logging Help!");
    var helpString = "";
    for (var i in commands) {
        var command = commands[i];
        helpString += command.keys[0] + " - " + command.description + "\n";
    }

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

        var splitMessage = message.split("\s+");
        if(!splitMessage[0]) return;
       
        var commandSuffix = splitMessage[0].endsWith(bot_name)?bot_name:"";      

        for (var i in commands) {
            var command = commands[i];
            for(var j in command.keys){
                var key = command.keys[j];
                if (splitMessage[0] == "/" + key + commandSuffix) {
                    command.execute(splitMessage, reqBody);
                    return;
                }
            }
        }

        if (splitMessage[0] == "/help"+commandSuffix) {
            printHelpCommand(reqBody);
            return;
        }

        if (splitMessage[0] == "/getcom"+commandSuffix) {
            printCommandList(reqBody);
            return;
        }
    }
}