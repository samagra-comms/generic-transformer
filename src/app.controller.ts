import { Controller } from "@nestjs/common";
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
import { test1 } from "./testXML";

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
  constructor(private readonly service: AppService) {}

  @Client({
    transport: Transport.KAFKA,

    options: {
      subscribe: {
        fromBeginning: true,
      },
      client: {
        clientId: "uci-gt",
        brokers: ["165.232.182.146:9094"],
      },
      consumer: {
        groupId: "generic-transformer",
      },
    },
  })
  client: UCIKafkaClient;

  async onModuleInit() {
    this.client.subscribeToResponseOf("generic-transformer");
    await this.client.connect();
    console.log(
      "consumer assignments: " +
        JSON.stringify(this.client.getConsumerAssignments())
    );
  }

  @MessagePattern("generic-transformer")
  async handleEntityCreated(payload: IncomingMessage) {
    console.log("got payload");
    const eventPayload = JSON.parse(payload.value);
    const responsePayload = await this.service.transform(
      eventPayload.xMessage,
      eventPayload.userData
    );
    await this.client.emit("process-outbound", payload.value).subscribe();
  }
}
