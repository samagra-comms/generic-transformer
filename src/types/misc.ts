export class Address {
  city: string;
  country: string;
  countryCode: number;
}

export class ButtonChoice {
  key: string;
  text: string;
  backmenu: boolean;
}

export class ContactCard {
  address: Address;
  name: string;
}

export enum State {
  STARTING = 1,
  ONGOING,
  COMPLETED,
}

export enum DeviceType {
  PHONE = "PHONE",
}

export enum StylingTag {
  LIST,
  QUICKREPLYBTN,
  IMAGE,
  AUDIO,
  VIDEO,
}

export class ConversationStage {
  stage: number;
  state: State;
}

export class LocationParams {
  longitude: number;
  latitude: number;
}

export class MessageId {
  Id: string;
  channelMessageId: string;
  replyId: string;
}

export class MessageMedia {
  category: string; //category list {image, audio, document, video}
  text: string; //caption, if applicable
  url: string;
}

export class Provider {
  name: string;
}

export class SenderReceiverInfo {
  // persist
  userID: string; //PhoneNo
  groups: Array<string>;
  campaignID: string;
  formID: string;
  bot: boolean;
  broadcast: boolean;
  meta: Map<string, string>;
  deviceType: DeviceType;
  deviceID: string; //UUID
  encryptedDeviceID: string; //Encrypted Device String
}

export class Transformer {
  id: string;
  metaData: Map<String, String>; //templateID, configID, userData
}

export class XMessagePayload {
  text: string;
  media: MessageMedia;
  location: LocationParams;
  contactCard: ContactCard;
  buttonChoices: Array<ButtonChoice>;
  stylingTag: StylingTag;
  flow: string;
  questionIndex: number;
  mediaCaption: string;
}

export class XMessageThread {
  offset: number; // normal form or simple chat..
  startDate: string;
  lastMessageId: string; // last incoming msgId
}
