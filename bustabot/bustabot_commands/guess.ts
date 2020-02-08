import telegramCommands = require("../../bot_core/telegram_commands");
import BotCommand from "../../bot_core/bot_command";

class Guess extends BotCommand {
    keys = ["guess"];
    description = "Guess";
    execute(key: string, params: string[], req: import("../../bot_core/telegram_request").default, data: any): void {
        telegramCommands.sendMessage(
            key,
            req.message.chat.id,
            req.message.message_id,
            "Guess");
    }

}

export default new Guess();