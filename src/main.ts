import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { setEnVars } from './envars';
import { InternalServerErrorException } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

let server: { close: (arg0: (err: any) => void) => void };

async function bootstrap() {
  console.log(process.env.KAFKA_HOST.length);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_HOST],
          clientId: process.env.KAFKA_CLIENT_ID,
        },
        subscribe: {
          fromBeginning: true,
        },
        consumer: {
          groupId: process.env.KAFKA_GROUP_ID,
        },
      },
    }
  );

  app.listen(() => console.log("Kafka consumer service is listening!"));
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

function shutdown() {
  // Gracefully close outstanding HTTP connections
  server.close((err) => {
    if (err) {
      console.error(
        "An error occurred while closing the server. Forecefullly shutting down"
      );
      console.error(err);
      process.exit(1);
    }
    console.log("Http server closed.");

    // Close data connections here, eg database pool connections

    // clean up your resources and exit
    process.exit(0);
  });
}

bootstrap();
