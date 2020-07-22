import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["warn", "error"]
  });

  app.setGlobalPrefix("/api");

  const port = process.env.PORT || 5001
  await app.listen(port, () => {
    console.log(`Service is running on port ${port}`)
  });
}
bootstrap();
