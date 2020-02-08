
import * as botInfo from "../bot_info";
import BotCommand from "../bot_core/bot_command"
import Bot from "../bot_core/bot";

import adicionar from "./jukebot_commands/adicionar";
import musica from "./jukebot_commands/musica";
import pular from "./jukebot_commands/pular";
import remover from "./jukebot_commands/remover";
import resetar from "./jukebot_commands/resetar";
import rodada from "./jukebot_commands/rodada";

const commands: Array<BotCommand> = [
    adicionar,
    musica,
    pular,
    remover,
    resetar,
    rodada
];

const jukebot = new Bot("jukebot", botInfo.jukebot, commands);
export default jukebot;