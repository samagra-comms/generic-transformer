import { Module, HttpModule } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),
    ClientsModule.registerAsync([
      {
        name: "KafkaClient",
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          return {
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: configService.get("KAFKA_CLIENT_ID"),
                brokers: [configService.get("KAFKA_HOST")],
              },
              consumer: {
                groupId: configService.get("KAFKA_GROUP_ID"),
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
