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

  describe("getHello", () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.sayHello()).toBe("Hello World!");
    });
  });
  describe("simplePDF generation", () => {
    it("should return PDF URL on correct userData", () => {
      const appController = app.get<AppController>(AppController);
      const url = "";
    });
  });
});
