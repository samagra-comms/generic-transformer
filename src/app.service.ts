import { HttpService, Injectable } from "@nestjs/common";

import { XMessage } from "./types/xMessage";
import { DoubtnutService } from "./doubtnut.service";
import {
  MediaCategory,
  MessageMedia,
  StylingTag,
  XMessagePayload,
} from "./types/misc";

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
    private readonly doubtnutService: DoubtnutService,
    ) {}

  async transform(xMessage: XMessage, userData: any): Promise<XMessage[]> {
    const xmessageClone = JSON.parse(JSON.stringify(xMessage));
    const xmessageClone2 = JSON.parse(JSON.stringify(xMessage));

    // Getting image from xMessage
    const isImage =
      xmessageClone?.payload?.media?.category === MediaCategory.IMAGE;
    const imageURL = xmessageClone?.payload?.media?.url;
    console.log(imageURL);

    //Transformers metadata can be used for additional context.
    const transformerMeta = xmessageClone.transformers.metaData;

    const doubtnutResponse = isImage ? (await this.doubtnutService.ask("IMAGE", "image/png;base64,{{base64string}}")) : (await this.doubtnutService.ask("TEXT", "From a point 375 metres away from the foot of a tower, the top of the tower is observed at an angle of elevation of 45. Then the height of the tower in metres is"));

    console.log(doubtnutResponse);

    // MediaMessage
    xmessageClone.payload = new XMessagePayload();
    xmessageClone.payload.media = new MessageMedia();
    xmessageClone.payload.media.text = "PNG"; //caption, if applicable
    xmessageClone.payload.media.category = MediaCategory.IMAGE_URL;
    xmessageClone.payload.media.url =
      "https://fileinfo.com/img/ss/xl/png_79.png";

    // Text Message
    xmessageClone2.payload.text = "Text Message 2"; //data.something

    // If you need to send multiple messages - push them into an array here. Create a deepclonse.
    return [xmessageClone, xmessageClone2];
  }
}
