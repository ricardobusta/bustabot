import BotCommand from "../bot_core/Bot/bot_command"
import Bot from "../bot_core/Bot/bot";

import benedict from "./bustabot_commands/benedict"
import birl from "./bustabot_commands/birl"
import cat from "./bustabot_commands/cat"
import count from "./bustabot_commands/count"
import grito from "./bustabot_commands/grito"
import match from "./bustabot_commands/match"
import merge from "./bustabot_commands/merge"
import moo from "./bustabot_commands/moo"
import ovo from "./bustabot_commands/ovo"
import roll from "./bustabot_commands/roll"
import rpg from "./bustabot_commands/rpg"
import stats from "./bustabot_commands/stats"
import versus from "./bustabot_commands/versus"
import word from "./bustabot_commands/word"

const commands: Array<BotCommand> = [
    benedict,
    birl,
    cat,
    count,
    grito,
    match,
    merge,
    moo,
    ovo,
    roll,
    rpg,
    stats,
    versus,
    word
];

const bustabot = new Bot("bustabot", commands);
export default bustabot;