import bent = require("bent");

class RequestService {
    async Head(url: string): Promise<string> {
        const head: bent.RequestFunction<any> = bent(url, 'HEAD');
        try {
            const response: any = await head('');
            return response.statusCode.toString();
        } catch (e) {
            if (e?.statusCode) {
                return e?.statusCode.toString();
            } else {
                return "0";
            }
        }
    }

    async Post(url: string, body: object, handle): Promise<void> {
        const post: bent.RequestFunction<any> = bent(url, 'POST', 'json', 200);
        try {
            const response: any = await post('', body);
            handle(await response?.errorMessage, response);
        } catch (e) {
            console.log(`Error: ${e} -- ${url} -- ${JSON.stringify(body)}`);
        }
    }

    async IsValidUrl(url: string): Promise<boolean> {
        let response: string = await this.Head(url);
        return response?.startsWith("2");
    }
}

export default RequestService;