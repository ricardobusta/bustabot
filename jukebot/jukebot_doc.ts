import BotData from "../bot_core/Bot/bot_data";

class JukebotDoc extends BotData {
    users: Array<string>;
    pool: Array<string>;
    past: Array<string>;
    next: string;
    timestamp: string;

    constructor() {
        super();
        this.users = [];
        this.pool = [];
        this.past = [];
        this.next = "";
        this.timestamp = "1980-01-01";
    }
};

export default JukebotDoc;