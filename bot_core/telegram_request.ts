class TelegramMessage {
    message: {
        text: string;
        chat: {
            id: string;
        };
        message_id: string;
        from: {
            first_name: string;
            id: string;
        };
    };
};

export default TelegramMessage;