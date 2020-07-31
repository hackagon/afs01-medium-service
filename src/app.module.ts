import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './datasource/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { ValidatorModule } from './modules/validator/validator.module';
import { StoryModule } from './modules/story/story.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule, ValidatorModule,
    StoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
