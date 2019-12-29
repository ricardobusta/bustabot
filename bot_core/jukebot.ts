import * as telegramCommands from "./telegram_commands";
import * as botInfo from "../bot_info";
import * as musica from "../jukebot_commands/musica";

const botName = "@" + botInfo.jukebot.name;
const botKey = botInfo.jukebot.key;
const docName = "statistics";

const commands = [
    require("../jukebot_commands/adicionar"),
    musica,
    require("../jukebot_commands/pular"),
    require("../jukebot_commands/remover"),
    require("../jukebot_commands/resetar"),
    require("../jukebot_commands/rodada"),
];

// Used to print the /help command.
function printHelpCommand(_: any, __: any, req: { message: { chat: { id: string; }; message_id: string }; }) {
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
        botKey,
        req.message.chat.id,
        null,
        helpString);
}

//  Prints the command list using /getcom. Used to configure the bot auto completion list.
function printCommandList(_: any, __: any, req: { message: { chat: { id: string; }; message_id: string }; }) {
    console.log("Logging Command list!");
    let helpString = "help - Mostra a lista de comandos do bot.\n";
    for (let i in commands) {
        let command = commands[i];
        helpString += command.keys[0] + " - " + command.description + "\n";
    }

    telegramCommands.sendMessage(
        botKey,
        req.message.chat.id,
        req.message.message_id,
        helpString);
}

function incrementCommandStatistics(data, command) {
    let document = data.doc(docName);
    document.get()
        .then(doc => {
            if (!doc.exists) {
                console.log("Document not set. Creating empty one.")
                document.set({
                    total: 0
                });
            } else {
                let totalKey = "total";
                let commandKey = "command_" + command;

                let statistics = doc.data();
                statistics[totalKey] = (totalKey in statistics) ? (statistics[totalKey] + 1) : 1;
                statistics[commandKey] = (commandKey in statistics) ? (statistics[commandKey]) + 1 : 1;

                console.log("Updating statistics for command " + command);
                console.log(statistics);

                document.set(statistics);
            }
        })
        .catch(err => {
            console.log("Error getting document", err);
        })
}

// Creates a command dictionary for each command alias.
const commandMap = (function () {
    let result: { [id: string]: any; } = {
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

var data = undefined;

// Initializes the bot internal state
export function init(db: { collection: (id: string) => any; }) {
    data = db.collection("jukebot_data");
    for (let i in commands) {
        if ("setData" in commands[i]) {
            console.log("Command data set: " + commands[i].keys[0]);
            commands[i].setData(data);
        }
    }
};
// The handler for the bot requests made by telegram webhook.
export function handleRequest(reqBody: { message: { text: string; }; }) {
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

    incrementCommandStatistics(data, key);

    // Call the command
    commandMap[key](botKey, splitMessage, reqBody);
};
