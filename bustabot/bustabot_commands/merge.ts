import telegramCommands = require("../../bot_core/Telegram/telegram_commands");
import BotCommand from "../../bot_core/Bot/bot_command";
import TelegramBot = require("node-telegram-bot-api");
import BotExecuteContext from "../../bot_core/Bot/bot_execute_data";

const fusionSpriteUrl = "https://raw.githubusercontent.com/Aegide/FusionSprites/master/Japeal/3/3.3.png";

class Birl extends BotCommand {
    keys = ["merge"];
    description = "Merge Pokemon";
    execute = function (ctx: BotExecuteContext): void {
        function sendMessage(text: string) {
            telegramCommands.sendMessage(
                ctx.botKey,
                ctx.message.chat.id,
                null,
                text);
        }

        function sendPicture(url: string) {
            telegramCommands.sendPhoto(
                ctx.botKey,
                ctx.message.chat.id,
                null,
                url);
        }

        if (ctx.params.length != 3) {
            sendMessage("You must enter 2 numbers as parameters");
            return;
        }

        let n1 = parseInt(ctx.params[1]);
        let n2 = parseInt(ctx.params[2]);
        if (isNaN(n1) || isNaN(n2)) {
            sendMessage("Both parameters must be valid numbers.");
            return;
        }

        let customBattlerUrl = `https://aegide.github.io/CustomBattlers/${n1}.${n2}.png`
        let fusionSpriteUrl = `https://raw.githubusercontent.com/Aegide/FusionSprites/master/Japeal/${n1}/${n1}.${n2}.png`

        telegramCommands.executeIfUrlExist(customBattlerUrl,
            function () {
                sendPicture(customBattlerUrl);
            },
            function () {
                telegramCommands.executeIfUrlExist(fusionSpriteUrl,
                    function () {
                        sendPicture(fusionSpriteUrl);
                    },
                    function () {
                        sendMessage("Image not found");
                    });
            });
    }
}

export default new Birl();