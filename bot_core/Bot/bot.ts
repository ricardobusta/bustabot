import {BotCommand, BotCommandContext} from "./bot_command";
import BotInfoEntry from "./bot_info_entry";
import TelegramBot = require("node-telegram-bot-api");
import TelegramService from "./telegram_service";
import HelpCommand from "./help_command";

const statisticsDocumentName: string = "statistics";

class Bot {
    botAlias: string;
    botName: string;
    botKey: string;
    version: string;
    commands: Array<BotCommand>;
    data: FirebaseFirestore.CollectionReference<any>;
    initialized: boolean;
    telegram: TelegramService;

    commandMap: { [id: string]: BotCommand};

    constructor(botAlias: string, commands: Array<BotCommand>, telegram: TelegramService) {
        this.initialized = false;
        this.botAlias = botAlias;
        this.commands = [...commands];
        this.telegram = telegram;

        this.commandMap = {
           "help": new HelpCommand(this.telegram, this.botAlias, this.version),
        };

        for (let i in commands) {
            let command: BotCommand = commands[i];
            for (let j in command.keys) {
                let key: string = command.keys[j];
                console.log(`Set command ${key}`);
                if (key in this.commandMap) {
                    console.log(`Duplicated command: ${key}. Will ignore.`);
                    continue;
                }
                this.commandMap[key] = command;
            }
        }

        (this.commandMap["help"] as HelpCommand).SetCommands(commands);
    }

    IncrementCommandStatistics(data: { doc: (arg0: string) => any; }, command: string): void {
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

                    document.set(statistics);
                }
            })
            .catch(err => {
                console.log("Error getting document", err);
            })
    }

    // Initializes the bot internal state
    Init(db: FirebaseFirestore.Firestore, botInfo: BotInfoEntry, url: string, version: string): void {
        if (botInfo === undefined) {
            return;
        }
        this.botName = "@" + botInfo.username;
        this.botKey = botInfo.token;
        this.version = version;

        this.data = db.collection(this.botAlias + "_data");

        this.initialized = true;

        this.telegram.SetWebhook(url, this.botKey).then();
        this.telegram.SetCommands(this.botKey, this.commands.filter(command => !command.wip).map(command => command.GetTelegramCommand()));
    };

    // The handler for the bot requests made by telegram webhook.
    HandleTelegramUpdate(update: TelegramBot.Update): void {
        const message: TelegramBot.Message = update?.message;
        // Ensure the message contains body
        if (!message?.text) {
            return;
        }
        let text: string = message.text;

        // And the message is a bot command
        if (!text.startsWith("/")) {
            return;
        }

        // And it is a somewhat valid command
        let splitText: RegExpMatchArray = text.match(/(?:[^\s'"]+|"[^"]*"|'[^']*')+/g);
        if (!splitText) return;
        let splitTextResult: string[] = splitText.map(t => t.replace(/^['"](.+)['"]$/, '$1'));
        let key: string = splitTextResult.at(0);
        if (key == null || key == "") return;

        // And that command is not directed to another bot
        let commandKey: string = key = key.substring(1, key.toLowerCase().endsWith(this.botName.toLowerCase()) ? key.length - this.botName.length : key.length)

        // Not a valid command or directed to another bot
        if (!(key in this.commandMap)) {
            return;
        }

        const userName: string = message.from ? (message.from.username ?? message.from.first_name) : "No-User";
        console.log(`Command accepted: ${key} chat_id: ${message.chat.id} user_id: ${userName}`);

        this.IncrementCommandStatistics(this.data, key);

        // Call the command
        let command: any = this.commandMap[key];
        let context: BotCommandContext = {
            commandKey: commandKey,
            botKey: this.botKey,
            params: splitText,
            message: message,
            data: this.data
        };
        command.Execute(context);
    };
}

export default Bot;