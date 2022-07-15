import { Controller, Inject } from "@nestjs/common";
import {
  Client,
  ClientKafka,
  MessagePattern,
  Transport,
} from "@nestjs/microservices";
import { Kafka } from "kafkajs";
import fetch from "node-fetch";
import { AppService } from "./app.service";
import { UCIKafkaClient } from "./client.kafka.provider";
import { test1, object } from "./testXML";
import { XMessage } from "./types/xMessage";

import { xml2js } from "xml-js";
import { ConfigService } from "@nestjs/config";
const { XMLParser, XMLBuilder } = require("fast-xml-parser");
const options = {
  ignoreAttributes: false,
};

interface IncomingMessage {
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offset: string;
  key: any;
  value: any;
  headers: Record<string, any>;
}

@Controller("generic-transformer")
export class AppController {
  constructor(
    private readonly service: AppService,
    private readonly configService: ConfigService,
    @Inject("KafkaClient") private readonly client: UCIKafkaClient
  ) {}

  parser = new XMLParser(options);
  builder = new XMLBuilder(options);

  async onModuleInit() {
    this.client.subscribeToResponseOf("generic-transformer");
    await this.client.connect();

    // Sample code to handle a message from the client
    await this.client
      .emit("generic-transformer", { value: JSON.stringify(test1) })
      .subscribe();

    console.log(
      "consumer assignments: " +
        JSON.stringify(this.client.getConsumerAssignments())
    );
  }

  // TODO: Refactor this to use subscription.
  @MessagePattern("generic-transformer")
  async handleEntityCreated(payload: IncomingMessage) {
    const eventPayload = JSON.parse(payload.value);
    const xmlObject = this.parser.parse(eventPayload);
    const parsedPayload: XMessage = xmlObject.xMessage as XMessage;
    const responsePayloads: XMessage[] = await this.service.transform(
      parsedPayload,
      null
    );

    const responsePayloadXMLs: string[] = responsePayloads.map(
      (responsePayload) =>
        this.builder.build({
          "?xml": xmlObject["?xml"],
          xMessage: responsePayload,
        })
    );

    for (const responsePayloadXML of responsePayloadXMLs) {
      await this.client.emit("process-outbound", {
        value: responsePayloadXML,
      });
    }
  }
}
