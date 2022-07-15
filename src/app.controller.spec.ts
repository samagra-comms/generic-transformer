import { Test, TestingModule } from "@nestjs/testing";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe("simplePDF generation", () => {
    it("should return PDF URL on correct userData", () => {
      const appController = app.get<AppController>(AppController);
      const url = "";
    });
  });
});
