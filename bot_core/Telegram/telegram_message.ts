import TelegramChat from "./telegram_chat";
import TelegramUser from "./telegram_user";

class TelegramMessage {
    message: {
        text: string;
        chat: TelegramChat;
        date: number;
        message_id: number;
        from: TelegramUser;
    };
};

export default TelegramMessage;