import { ClientKafka, KafkaOptions } from "@nestjs/microservices";
import { KafkaConfig } from "@nestjs/microservices/external/kafka.interface";

export class UCIKafkaClient extends ClientKafka {
  constructor(options: KafkaOptions["options"]) {
    super(options);

    const clientOptions =
      this.getOptionsProp(this.options, "client") || ({} as KafkaConfig);
    // .... Omitted for simplicity
    // Remove the '-client'
    this.clientId = clientOptions.clientId;
  }

  protected getResponsePatternName(pattern: string): string {
    console.log("getResponsePatternName", pattern);
    return "process-outbound";
  }
}
