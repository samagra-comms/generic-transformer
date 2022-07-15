import { ConfigService } from "@nestjs/config";
import { ClientKafka, KafkaOptions } from "@nestjs/microservices";
import { KafkaConfig } from "@nestjs/microservices/external/kafka.interface";

export class UCIKafkaClient extends ClientKafka {
  constructor(
    options: KafkaOptions["options"],
    private readonly configService: ConfigService
  ) {
    super(options);
    options = {
      subscribe: {
        fromBeginning: true,
      },
      client: {
        clientId: configService.get<string>("KAFKA_CLIENT_ID"),
        brokers: [configService.get<string>("KAFKA_BROKER")],
      },
      consumer: {
        groupId: configService.get<string>("KAFKA_CLIENT_ID"),
      },
    };

    const clientOptions =
      this.getOptionsProp(this.options, "client") || ({} as KafkaConfig);
    // .... Omitted for simplicity
    // Remove the '-client'
    this.clientId = clientOptions.clientId;
  }

  protected getResponsePatternName(pattern: string): string {
    return "process-outbound";
  }
}
