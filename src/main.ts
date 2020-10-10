import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['warn', 'error'],
  });

  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: false,
      },
    }),
  );

  const port = process.env.PORT || 5000;
  await app.listen(port, () => {
    console.log(`Service is running on port ${port}`);
  });
}
bootstrap();
