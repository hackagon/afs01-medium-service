import { AppService } from './app.service';
import { AppController } from './app.controller';

const sum = (a: number, b: number): number => a + b;

describe('Learning Testing With Jest', () => {
  let appService: AppService;
  let appController: AppController;

  beforeEach(() => {
    appService = new AppService();
    appController = new AppController(appService);
  });

  it('First Test', () => {
    const res = sum(1, 2);
    expect(res).toBe(3);
  });

  it('Test App Service', () => {
    const result = 'Hello World!';

    expect(appService.getHello()).toBe(result);
  });

  it('Test App Controller', () => {
    const result = 'Hello World!';

    expect(appController.getHello()).toBe(result);
  });
});
