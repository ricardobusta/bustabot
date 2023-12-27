import BotCommand, { BotCommandExecute } from "./bot_command"
import BotInfoEntry from "./bot_info_entry";
import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "./bot_execute_data";
import TelegramService from "./telegram_service";
import RequestService from "./request_service";

const statisticsDocumentName: string = "statistics";

const requestService: RequestService = new RequestService();
const telegramService: TelegramService = new TelegramService(requestService);

class Bot {
    botAlias: string;
    botName: string;
    botKey: string;
    version: string;
    commands: Array<BotCommand>;
    data: FirebaseFirestore.CollectionReference<any>;
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
            let command: BotCommand = commands[i];
            for (let j in command.keys) {
                let key: string = command.keys[j];
                if (key in this.commandMap) {
                    console.log(`Duplicated command: ${key}. Will ignore.`);
                    continue;
                }
                this.commandMap[key] = command.execute;
            }
        }
    }

    // Used to print the /help command.
    printHelpCommand(context: BotExecuteContext): void {
        console.log("Logging Help!");

        let helpString: string = `<b>${this.botName} v${context.version} Help:</b>\n`;
        for (let i in this.commands) {
            let command: BotCommand = this.commands[i];
            if (command.wip) {
                continue;
            }
            helpString += `/${command.keys[0]} - ${command.description}\n`;
        }

        telegramService.SendMessage(
            context.botKey,
            context.message.chat.id,
            context.message.message_id,
            helpString);
    }

    //  Prints the command list using /getcom. Used to configure the bot auto completion list.
    printCommandList(context: BotExecuteContext): void {
        console.log("Logging Command list!");

        let comString = "help - Mostra a lista de comandos do bot.\n";
        for (let i in this.commands) {
            let command = this.commands[i];
            comString += `${command.keys[0]} - ${command.description}\n`;
        }

        telegramService.SendMessage(
            context.botKey,
            context.message.chat.id,
            context.message.message_id,
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

                    document.set(statistics);
                }
            })
            .catch(err => {
                console.log("Error getting document", err);
            })
    }

    // Initializes the bot internal state
    init(db: FirebaseFirestore.Firestore, botInfo: BotInfoEntry, url: string, version: string) {
        if (botInfo === undefined) {
            return;
        }
        this.botName = "@" + botInfo.username;
        this.botKey = botInfo.token;
        this.version = version;

        this.data = db.collection(this.botAlias + "_data");

        this.initialized = true;

        telegramService.SetWebhook(url, this.botKey).then();
        telegramService.SetCommands(this.botKey, this.commands.filter(command => !command.wip).map(command => command.GetTelegramCommand()));
    };

    // The handler for the bot requests made by telegram webhook.
    handleTelegramUpdate(update: TelegramBot.Update): void {
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

        this.incrementCommandStatistics(this.data, key);

        // Call the command
        // Thanks github.com/spectraldani for figuring out.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
        let command: any = this.commandMap[key].bind(this);
        let context: BotExecuteContext = {
            commandKey: commandKey,
            botKey: this.botKey,
            params: splitText,
            message: message,
            data: this.data,
            version: this.version
        };
        command(context);
    };
}

export default Bot;