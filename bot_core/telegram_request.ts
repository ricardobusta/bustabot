class TelegramRequest {
    message: { chat: { id: string; }; message_id: string };
};

export default TelegramRequest;