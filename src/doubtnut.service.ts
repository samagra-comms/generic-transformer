import axios from "axios";

export class DoubtnutService {
    async ask(messageType: string, message: any) {
        const config = {
            method: 'post',
            url: process.env.askUrl,
            headers: { 
              'Content-Type': 'application/json',
              'Message-Type': messageType,
            },
            data : JSON.stringify({
              message,
            }),
        };
        const res = await axios(config);
        return res.data;
    }
}
