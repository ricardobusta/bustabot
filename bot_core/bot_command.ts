abstract class BotCommand {
    abstract keys: Array<string>;
    abstract description: string;
    abstract execute(key: string, params: Array<string>, req: any, data: any): void;

    wip = false;
}

export default BotCommand;