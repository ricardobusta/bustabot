class JukebotDoc {
    users: Array<string>;
    pool: Array<string>;
    past: Array<string>;
    next: string;
    timestamp: string;

    constructor() {
        this.users = [];
        this.pool = [];
        this.past = [];
        this.next = "";
        this.timestamp = "1980-01-01";
    }
};

export default JukebotDoc;