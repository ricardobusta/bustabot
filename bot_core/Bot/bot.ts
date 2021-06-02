import BotCommand, { BotCommandExecute } from "./bot_command"
import * as telegramCommands from "../Telegram/telegram_commands";
import BotInfoEntry from "./bot_info_entry";
import TelegramBot = require("node-telegram-bot-api");

const statisticsDocumentName = "statistics";

class Bot {
    botAlias: string;
    botName: string;
    botKey: string;
    commands: Array<BotCommand>;
    data: any;
    initialized: boolean;

    commandMap: { [id: string]: BotCommandExecute };

    constructor(botAlias: string, commands: Array<BotCommand>) {
        this.initialized = false;
        this.botAlias = botAlias;
        this.commands = [...commands];

        this.commandMap = {
            "help": this.printHelpCommand,
        };

        for (let i in commands) {
            let command = commands[i];
            for (let j in command.keys) {
                let key = command.keys[j];
                if (key in this.commandMap) {
                    console.log(`Duplicated command: ${key}. Will ignore.`);
                    continue;
                }
                this.commandMap[key] = command.execute;
            }
        }

        console.log(this);
    }

    // Used to print the /help command.
    printHelpCommand(_commandKey: string, botKey: string, _params: string[], message: TelegramBot.Message, _data: any): void {
        console.log("Logging Help!");

        let helpString = `<b>${this.botName} Help:</b>\n`;
        for (let i in this.commands) {
            let command = this.commands[i];
            if (command.wip) {
                continue;
            }
            helpString += `/${command.keys[0]} - ${command.description}\n`;
        }

        telegramCommands.sendMessage(
            botKey,
            message.chat.id,
            message.message_id,
            helpString);
    }

    //  Prints the command list using /getcom. Used to configure the bot auto completion list.
    printCommandList (_commandKey: string, botKey: string, _params: string[], message: TelegramBot.Message, _data: any): void {
        console.log("Logging Command list!");

        let comString = "help - Mostra a lista de comandos do bot.\n";
        for (let i in this.commands) {
            let command = this.commands[i];
            comString += `${command.keys[0]} - ${command.description}\n`;
        }

        telegramCommands.sendMessage(
            botKey,
            message.chat.id,
            message.message_id,
            comString);
    }

    incrementCommandStatistics(data: { doc: (arg0: string) => any; }, command: string) {
        let document = data.doc(statisticsDocumentName);
        document.get()
            .then((doc: { exists: any; data: () => any; }) => {
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
    init(db: FirebaseFirestore.Firestore, botInfo: BotInfoEntry, url: string) {
        if (botInfo === undefined) {
            return;
        }
        this.botName = "@" + botInfo.username;
        this.botKey = botInfo.token;

        this.data = db.collection(this.botAlias + "_data");

        this.initialized = true;

        telegramCommands.setWebhook(url, this.botKey);
        telegramCommands.setCommands(this.botKey, this.commands.filter(command => !command.wip).map(command => command.GetTelegramCommand()));
    };

    // The handler for the bot requests made by telegram webhook.
    handleTelegramUpdate(update: TelegramBot.Update) {
        const message = update?.message;
        // Ensure the message contains body
        if (!message || !message.text) {
            return;
        }
        let text = message.text;

        // And the message is a bot command
        if (!text.startsWith("/")) {
            return;
        }

        // And it is a somewhat valid command
        let splitText = text.match(/(?:[^\s'"]+|"[^"]*"|'[^']*')+/g);
        if (!splitText) return;
        splitText = splitText.map(t => t.replace(/^['"](.+)['"]$/, '$1'));
        let key = splitText[0];
        if (key == null || key == "") return;

        // And that command is not directed to another bot
        let commandKey = key = key.substring(1, key.toLowerCase().endsWith(this.botName.toLowerCase()) ? key.length - this.botName.length : key.length)

        // Not a valid command or directed to another bot
        if (!(key in this.commandMap)) {
            return;
        }

        console.log("Command accepted: " + key);

        this.incrementCommandStatistics(this.data, key);

        // Call the command
        // Thanks github.com/spectraldani for figuring out.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
        let command = this.commandMap[key].bind(this);
        command(commandKey, this.botKey, splitText, message, this.data);
    };
}

export default Bot;