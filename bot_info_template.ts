import BotInfoEntry from "./bot_core/Bot/bot_info_entry";

const botInfo: Map<string, BotInfoEntry> = new Map([
    ['bustabot', { name: 'TELEGRAM_BOT_NAME', key: 'TELEGRAM_BOT_KEY' }],
    ['jukebot', { name: 'TELEGRAM_BOT_NAME', key: 'TELEGRAM_BOT_KEY' }]
]);

const botInfoDev: Map<string, BotInfoEntry> = new Map([
    ['bustabot', { name: 'TELEGRAM_BOT_NAME', key: 'TELEGRAM_BOT_KEY' }],
    ['jukebot', { name: 'TELEGRAM_BOT_NAME', key: 'TELEGRAM_BOT_KEY' }]
]);

// Array of bots
export const getInfo = function (botAlias: string, developmentMode: boolean): BotInfoEntry {
    let map = developmentMode ? botInfoDev : botInfo;
    if (map && map[botAlias]) {
        return map[botAlias];
    }
    return undefined;
};

// Id for the google cloud project
export const projectId = 'GOOGLE_PROJECT_ID';