import { XMessage } from "./types/xMessage";
const options = {
  ignoreAttributes: false,
};
const { XMLParser, XMLBuilder } = require("fast-xml-parser");
const parser = new XMLParser(options);

export const test1 = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<xMessage>
    <adapterId>44a9df72-3d7a-4ece-94c5-98cf26307324</adapterId>
    <app>UCI Demo</app>
    <channel>WhatsApp</channel>
    <channelURI>WhatsApp</channelURI>
    <from>
        <bot>false</bot>
        <broadcast>false</broadcast>
        <userID>admin</userID>
    </from>
    <lastMessageID>384ee9c0-03f5-11ed-990c-1d27a38c9cfc</lastMessageID>
    <messageId>
        <channelMessageId>4568693837499514195-286050847690804707</channelMessageId>
    </messageId>
    <messageState>REPLIED</messageState>
    <messageType>TEXT</messageType>
    <ownerId>95e4942d-cbe8-477d-aebd-ad8e6de4bfc8</ownerId>
    <ownerOrgId>ORG_001</ownerOrgId>
    <payload>
        <text>Hi UCI</text>
    </payload>
    <provider>gupshup</provider>
    <providerURI>gupshup</providerURI>
    <sessionId>513b93f1-4b61-413c-bac0-2b6be21da396</sessionId>
    <timestamp>1657859954262</timestamp>
    <to>
        <bot>false</bot>
        <broadcast>false</broadcast>
        <campaignID>UCI Demo</campaignID>
        <deviceID>cd461a66-d988-44cc-868e-cca8a906621b</deviceID>
        <deviceType>PHONE</deviceType>
        <encryptedDeviceID>3hnnxT03vo4Vem6yjToicNb0wsmh8St/ty+pM5Q+4W4=</encryptedDeviceID>
        <userID>7597185708</userID>
    </to>
    <transformers>
        <id>bbf56981-b8c9-40e9-8067-468c2c753659</id>
        <metaData>
            <entry>
                <key>formID</key>
                <value></value>
            </entry>
            <entry>
                <key>startingMessage</key>
                <value>Hi UCI</value>
            </entry>
            <entry>
                <key>botOwnerOrgID</key>
                <value>ORG_001</value>
            </entry>
            <entry>
                <key>id</key>
                <value>bbf56981-b8c9-40e9-8067-468c2c753659</value>
            </entry>
            <entry>
                <key>botId</key>
                <value>d655cf03-1f6f-4510-acf6-d3f51b488a5e</value>
            </entry>
            <entry>
                <key>botOwnerID</key>
                <value>95e4942d-cbe8-477d-aebd-ad8e6de4bfc8</value>
            </entry>
            <entry>
                <key>type</key>
                <value>generic</value>
            </entry>
            <entry>
                <key>url</key>
                <value>https://hosted.my.form.here.com</value>
            </entry>
        </metaData>
    </transformers>
</xMessage>`;

export const object: XMessage = parser.parse(test1);
const builder = new XMLBuilder(options);
export const xmlDataStr = builder.build(object);
// export const object: XMessage = xml2js(test1, { compact: true }) as XMessage;
// console.log(object);
//     .elements[0] as XMessage;
//   console.log(JSON.stringify(object));
