import BotCommand from "../bot_core/Bot/bot_command"
import Bot from "../bot_core/Bot/bot";

import About from "./bustabot_commands/about"
import Acende from "./bustabot_commands/acende";
import Benedict from "./bustabot_commands/benedict"
import Birl from "./bustabot_commands/birl"
import Cat from "./bustabot_commands/cat"
import Count from "./bustabot_commands/count"
import Grito from "./bustabot_commands/grito"
import Match from "./bustabot_commands/match"
import Moo from "./bustabot_commands/moo"
import Ovo from "./bustabot_commands/ovo"
import Roll from "./bustabot_commands/roll"
import Rpg from "./bustabot_commands/rpg"
import Stats from "./bustabot_commands/stats"
import Versus from "./bustabot_commands/versus"
import Word from "./bustabot_commands/word"
import TelegramService from "../bot_core/Bot/telegram_service";
import RequestService from "../bot_core/Bot/request_service";

class BustaBot extends Bot {
    constructor(telegram: TelegramService, request: RequestService, version: string) {
        const commands: Array<BotCommand> = [
            new About(telegram, version),
            new Acende(telegram),
            new Benedict(telegram),
            new Birl(telegram),
            new Cat(telegram, request),
            new Count(telegram),
            new Grito(telegram),
            new Match(telegram),
            new Moo(telegram),
            new Ovo(telegram),
            new Roll(telegram),
            new Rpg(telegram),
            new Stats(telegram),
            new Versus(telegram),
            new Word(telegram)
        ];

        super("bustabot", commands, telegram);
    }
}

export default BustaBot;