import BotCommand from "../types/bot_command"
import Bot from "../bot";

import benedict from "./commands/benedict"
import birl from "./commands/birl"
import cat from "./commands/cat"
import count from "./commands/count"
import match from "./commands/match"
import moo from "./commands/moo"
import ovo from "./commands/ovo"
import roll from "./commands/roll"
import rpg from "./commands/rpg"
import versus from "./commands/versus"

const commands: Array<BotCommand> = [
    benedict,
    birl,
    cat,
    count,
    match,
    moo,
    ovo,
    roll,
    rpg,
    versus
];

const bustabot = new Bot("bustabot", commands);
export default bustabot;