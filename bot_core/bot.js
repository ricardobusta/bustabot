const telegramCommands = require("./telegram_commands");
const botName = "@" + require("./bot_info").name;

const commands = [
    require("../bot_commands/benedict_command"),
    require("../bot_commands/birl_command"),
    require("../bot_commands/cat_command"),
    require("../bot_commands/count_command"),
    require("../bot_commands/describe_command"),
    //require("../bot_commands/grito_command"),
    //require("../bot_commands/guess_command"),
    require("../bot_commands/roll_command"),
    require("../bot_commands/rpg_command"),
    require("../bot_commands/versus_command"),
];

// Used to print the /help command.
function printHelpCommand(_, req) {
    console.log("Logging Help!");
    let helpString = "<b>" + botName + " Help:</b>\n";
    for (let i in commands) {
        let command = commands[i];
        if (command.wip) {
            continue;
        }
        helpString += "/" + command.keys[0] + " - " + command.description + "\n";
    }

    telegramCommands.sendMessage(
        req.message.chat.id,
        helpString);
}

//  Prints the command list using /getcom. Used to configure the bot auto completion list.
function printCommandList(_, req) {
    console.log("Logging Command list!");
    let helpString = "help - Mostra a lista de comandos do bot.";
    for (let i in commands) {
        let command = commands[i];
        helpString += command.keys[0] + " - " + command.description + "\n";
    }

    telegramCommands.sendMessage(
        req.message.chat.id,
        helpString);
}

// Creates a command dictionary for each command alias.
const commandMap = (function () {
    let result = {
        "help": printHelpCommand,
        "getcom": printCommandList
    };

    for (let i in commands) {
        let command = commands[i];
        for (let j in command.keys) {
            let key = command.keys[j];
            if (key in result) {
                console.log("Duplicated command: " + key + ". Will ignore.");
                continue;
            }
            result[key] = command.execute;
        }
    }
    console.log("Created " + result.length + " aliases for commands.");
    return result;
})();

module.exports = {
    // Initializes the bot internal state
    init: function (db) {
        var data = db.collection("bot_data");
        for (let i in commands) {
            if ("setData" in commands[i]) {
                console.log("Command data set: " + commands[i].keys[0]);
                commands[i].setData(data);
            }
        }
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
        let key = splitMessage[0];
        if (key == null || key == "") return;

        // And that command is not directed to another bot
        splitMessage[0] = key = key.substring(1, key.endsWith(botName) ? key.length - botName.length : key.length)

        // Not a valid command or directed to another bot
        if (!(key in commandMap)) {
            return;
        }

        console.log("Command accepted: " + key);

        // Call the command
        commandMap[key](splitMessage, reqBody);
    }
}