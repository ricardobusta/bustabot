import BotInfoEntry from "./bot_info_entry";
const botInfo: BotInfo = require("../../bot_key");
class BotInfo {
    webhook: string; // base url for webhooks
    project_id: string; // project id on google cloud
    info: Map<string, Map<string, BotInfoEntry>>; // Info by [dev/prod][botAlias]
}

export default botInfo;