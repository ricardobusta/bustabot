import BotCommand from "../types/bot_command"
import Bot from "..";

import benedict from "./bustabot_commands/benedict"
import birl from "./bustabot_commands/birl"
import cat from "./bustabot_commands/cat"
import count from "./bustabot_commands/count"
import match from "./bustabot_commands/match"
import moo from "./bustabot_commands/moo"
import roll from "./bustabot_commands/roll"
import rpg from "./bustabot_commands/rpg"
import versus from "./bustabot_commands/versus"

const commands: Array<BotCommand> = [
    benedict,
    birl,
    cat,
    count,
    match,
    moo,
    roll,
    rpg,
    versus
];

const bustabot = new Bot("bustabot", commands);
export default bustabot;