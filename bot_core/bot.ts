import BotCommand from "./bot_command"
import TelegramRequest from "./telegram_request"
import * as telegramCommands from "./telegram_commands";

const statisticsDocumentName = "statistics";

class Bot {
    botAlias: string;
    botName: string;
    botKey: string;
    commands: Array<BotCommand>;
    data: any;

    commandMap: { [id: string]: (x: any, y: any, z: TelegramRequest, w: any) => void; };

    constructor(botAlias: string, botInfo: { key: string, name: string }, commands: Array<BotCommand>) {
        this.botAlias = botAlias;
        this.botName = "@" + botInfo.name;
        this.botKey = botInfo.key;
        this.commands = commands;

        this.commandMap = {
            "help": this.printHelpCommand,
            "getcom": this.printCommandList
        };

        for (let i in commands) {
            let command = commands[i];
            for (let j in command.keys) {
                let key = command.keys[j];
                if (key in this.commandMap) {
                    console.log("Duplicated command: " + key + ". Will ignore.");
                    continue;
                }
                this.commandMap[key] = command.execute;
            }
        }
        console.log("Created " + this.commandMap.length + " aliases for commands.");
    }

    // Used to print the /help command.
    printHelpCommand(_key: any, _params: any, req: TelegramRequest, _data: any) {
        console.log("Logging Help!");
        let helpString = "<b>" + this.botName + " Help:</b>\n";
        for (let i in this.commands) {
            let command = this.commands[i];
            if (command.wip) {
                continue;
            }
            helpString += "/" + command.keys[0] + " - " + command.description + "\n";
        }

        telegramCommands.sendMessage(
            this.botKey,
            req.message.chat.id,
            req.message.message_id,
            helpString);
    }

    //  Prints the command list using /getcom. Used to configure the bot auto completion list.
    printCommandList(_key: any, _params: any, req: TelegramRequest, _data: any) {
        console.log("Logging Command list!");
        let helpString = "help - Mostra a lista de comandos do bot.\n";
        for (let i in this.commands) {
            let command = this.commands[i];
            helpString += command.keys[0] + " - " + command.description + "\n";
        }

        telegramCommands.sendMessage(
            this.botKey,
            req.message.chat.id,
            req.message.message_id,
            helpString);
    }

    incrementCommandStatistics(data, command) {
        let document = data.doc(statisticsDocumentName);
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

    // Initializes the bot internal state
    init(db: { collection: (id: string) => any; }) {
        this.data = db.collection(this.botAlias + "_data");
    };

    // The handler for the bot requests made by telegram webhook.
    handleRequest(reqBody: { message: { text: string; }; }) {
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
        splitMessage[0] = key = key.substring(1, key.endsWith(this.botName) ? key.length - this.botName.length : key.length)

        // Not a valid command or directed to another bot
        if (!(key in this.commandMap)) {
            return;
        }

        console.log("Command accepted: " + key);

        this.incrementCommandStatistics(this.data, key);

        // Call the command
        this.commandMap[key](this.botKey, splitMessage, reqBody, this.data);
    };
}

export default Bot;