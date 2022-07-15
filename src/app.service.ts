import { HttpService, Injectable } from "@nestjs/common";

import { XMessage } from "./types/xMessage";
import { StylingTag, XMessagePayload } from "./types/misc";

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async transform(xMessage: XMessage, userData: any): Promise<XMessage[]> {
    const xmessageClone = JSON.parse(JSON.stringify(xMessage));
    const xmessageClone2 = JSON.parse(JSON.stringify(xMessage));

    //Transformers metadata can be used for additional context.
    const transformerMeta = xmessageClone.transformers.metaData;

    // MediaMessage
    xmessageClone.payload = new XMessagePayload();
    xmessageClone.payload.mediaCaption = "PNG";
    xmessageClone.payload.stylingTag = StylingTag.IMAGE_URL;
    xmessageClone.payload.text = "https://fileinfo.com/img/ss/xl/png_79.png";

    // Text Message
    xmessageClone2.payload.text = "Text Message 2"; //data.something

    // If you need to send multiple messages - push them into an array here. Create a deepclonse.
    return [xmessageClone, xmessageClone2];
  }
}
