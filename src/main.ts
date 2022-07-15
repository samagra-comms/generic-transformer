import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { setEnVars } from './envars';
import { InternalServerErrorException } from "@nestjs/common";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

let server: { close: (arg0: (err: any) => void) => void };

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ["165.232.182.146:9094"],
        },
        subscribe: {
          fromBeginning: true,
        },
        consumer: {
          groupId: "generic-transformer",
        },
      },
    }
  );

  app.listen(() => console.log("Kafka consumer service is listening!"));

  // const app = await NestFactory.create(AppModule);
  // const configService = app.get<ConfigService>(ConfigService);
  // await app.listen(3002, "0.0.0.0");

  // const microservice = app.connectMicroservice({
  //   transport: Transport.KAFKA,
  //   name: "SUNBIRD_TELEMETRY",
  //   options: {
  //     client: {
  //       brokers: "165.232.182.146:9094",
  //     },
  //     consumer: {
  //       groupId: "generic-transformer",
  //     },
  //   },
  // });

  // await app.startAllMicroservices();

  // await app.listen(3002, "0.0.0.0");

  // Handle process kill signals
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
