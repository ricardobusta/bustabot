const telegramCommands = require('./telegram_commands');
const botName = require("./bot_info").name;

const commands = [
    require('../bot_commands/benedict_command'),
    require('../bot_commands/birl_command'),
    require('../bot_commands/cat_command'),
    require('../bot_commands/describe_command'),
    //require('../bot_commands/grito_command'),
    //require('../bot_commands/guess_command'),
    require('../bot_commands/roll_command'),
    require('../bot_commands/rpg_command'),
    require('../bot_commands/versus_command'),
];

// Used to print the /help command.
function printHelpCommand(reqBody) {
    console.log("Logging Help!");
    let helpString = "<b>BustaBot Help:</b>\n";
    for (let i in commands) {
        let command = commands[i];
        if (command.wip) {
            continue;
        }
        helpString += "/" + command.keys[0] + " - " + command.description + "\n";
    }

    telegramCommands.sendMessage(
        reqBody.message.chat.id,
        helpString);
}

//  Prints the command list using /getcom. Used to configure the bot auto completion list.
function printCommandList(reqBody) {
    console.log("Logging Help!");
    let helpString = "";
    for (let i in commands) {
        let command = commands[i];
        helpString += command.keys[0] + " - " + command.description + "\n";
    }

    telegramCommands.sendMessage(
        reqBody.message.chat.id,
        helpString);
}

module.exports = {
    // Initializes the bot internal state
    init: function (db) {

    },
    // The handler for the bot requests made by telegram webhook.
    handleRequest: function (reqBody) {
        // Ensure the message contains body
        if (!reqBody || !reqBody.message || !reqBody.message.text) {
            return;
        }
        let message = reqBody.message.text;

        // And the message is a bot command
        if (!message.startsWith("/")) {
            return;
        }

        // And it is a somewhat valid command
        let splitMessage = message.split(/\s+/);
        if (!splitMessage) return;
        if (splitMessage[0] == null || splitMessage[0] == "") return;

        // And that command is not directed to another bot
        let commandSuffix = splitMessage[0].endsWith(botName) ? botName : "";

        // Then check which command that is
        for (let i in commands) {
            let command = commands[i];
            for (let j in command.keys) {
                let key = command.keys[j];
                if (splitMessage[0] == "/" + key + commandSuffix) {
                    console.log(reqBody);
                    command.execute(splitMessage, reqBody);
                    return;
                }
            }
        }

        if (splitMessage[0] == "/help" + commandSuffix) {
            printHelpCommand(reqBody);
            return;
        }

        if (splitMessage[0] == "/getcom" + commandSuffix) {
            printCommandList(reqBody);
            return;
        }
    }
}