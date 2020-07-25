
import BotCommand from "../types/bot_command"
import Bot from "../bot";

import adicionar from "./commands/adicionar";
import musica from "./commands/musica";
import pular from "./commands/pular";
import remover from "./commands/remover";
import resetar from "./commands/resetar";
import rodada from "./commands/rodada";

const commands: Array<BotCommand> = [
    adicionar,
    musica,
    pular,
    remover,
    resetar,
    rodada
];

const jukebot = new Bot("jukebot", commands);
export default jukebot;