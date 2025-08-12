import {BotCommand, BotCommandContext} from "../../bot_core/Bot/bot_command";

class Versus extends BotCommand {
    keys: string[] = ["morph", "mor", "m"];
    description: string = "Versus";

    async Execute(ctx: BotCommandContext): Promise<void> {
        let text: string;
        if (ctx.params.length <= 2) {
            text = "Número de parâmetros insuficiente. Precisa de pelo menos dois.\n" +
                "/vs valor_um valor_dois .. valor_ultimo";
            console.log("Invalid");
        } else {
            let word1: string = ctx.params[1];
            let word2: string = ctx.params[2];
            let lcs: string = longestCommonSubsequence(word1, word2);

            text = stepToLCS(word1, lcs);
            text += `\n`
            text += stepFromLCS(lcs, word2);
        }

        this.telegram.SendMessage(
            ctx.botKey,
            ctx.message.chat.id,
            ctx.message.message_id,
            text
        );
    }
}

function longestCommonSubsequence(str1: string, str2: string): string {
    const m: number = str1.length;
    const n: number = str2.length;

    // Create a 2D DP array initialized with zeros
    const dp: number[][] = Array.from({length: m + 1}, () => Array(n + 1).fill(0));

    // Fill DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Reconstruct the LCS string from the DP table
    let lcs: string = '';
    let i: number = m, j: number = n;
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            lcs = str1[i - 1] + lcs;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return lcs;
}

function stepToLCS(str1: string, lcs: string): string {
    let text: string = str1;
    let j = 0;
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] != lcs[j] && str1.length > lcs.length+1) {
            str1 = str1.slice(0, i) + str1.slice(i + 1);
            text = `${text}\n${str1}`;
            i--;
        } else {
            j++;
        }
    }
    return text;
}

function stepFromLCS(lcs: string, str2: string): string {
    let text: string = str2;
    let j: number = 0;
    for (let i = 0; i < str2.length; i++) {
        if (str2[i] != lcs[j]) {
            str2 = str2.slice(0, i) + str2.slice(i + 1);
            text = `${str2}\n${text}`;
            i--;
        } else {
            j++;
        }
    }
    return text;
}

export default Versus;