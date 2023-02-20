import axios from "axios";

export class DoubtnutService {
    async ask(messageType: string, message: any) {
        const config = {
            method: 'post',
            url: process.env.askUrl,
            headers: { 
              'Content-Type': 'application/json',
              'message-type': messageType,
            },
            data : JSON.stringify({
              message,
            }),
        };
        const res = await axios(config);
        return res.data;
    }
}
