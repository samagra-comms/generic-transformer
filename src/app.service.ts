import { HttpService, Injectable } from "@nestjs/common";

import { XMessage } from "./types/xMessage";
import { XMessagePayload } from "./types/misc";

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async transform(xMessage: XMessage, userData: any): Promise<XMessage> {
    const url = process.env.COUNTRY_LIST_API_ENDPOINT;
    // data for PDF
    // Transformer Metadata {JSON} + UserData {JSON} [AES encryption]
    const transformerMeta = xMessage.transformers[0].metaData;
    const { data } = await this.httpService
      .post(url, { transformerMeta, userData })
      .toPromise();

    // change xMessage
    xMessage.payload = new XMessagePayload();
    xMessage.payload.text = "URL of the PDF"; //data.something
    console.log(`There are ${data.length} countries in Africa!`);
    return xMessage;
  }
}
