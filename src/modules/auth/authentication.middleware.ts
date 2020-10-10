import {
  Injectable,
  NestMiddleware,
  HttpService,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as _ from 'lodash';
import { BadRequestException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(
    private httpService: HttpService,
    private userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    console.log('runnnnnnn');

    // token truyen trong Authorization cua Header
    const token = _.get(req, 'headers.authorization');

    const payload = await this.verifyToken(token);

    const email = payload.email;

    let user = await this.userService.getUserByEmail(email);
    if (!user) user = await this.userService.createUser({ email });

    _.set(req, 'user', user);

    next();
  }

  async verifyToken(token: string) {
    return this.httpService
      .post(`http://localhost:5001/api/auth/verify?token=${token}`)
      .toPromise()
      .then(res => {
        return _.get(res, 'data.payload');
      })
      .catch(err => {
        console.log(err);
        throw new BadRequestException('token is invalid');
      });
  }
}
