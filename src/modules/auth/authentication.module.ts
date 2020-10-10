import {
  Module,
  NestModule,
  MiddlewareConsumer,
  HttpModule,
} from '@nestjs/common';
import { AuthenticationMiddleware } from './authentication.middleware';
import { UserModule } from '../user/user.module';

@Module({
  imports: [HttpModule, UserModule],
  providers: [AuthenticationMiddleware],
})
export class AuthenticationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*');
  }
}
