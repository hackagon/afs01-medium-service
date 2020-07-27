import { Module } from "@nestjs/common";
import { IsUniqueEmail } from './isUniqueEmail';

@Module({
  imports: [],
  providers: [IsUniqueEmail]
})
export class ValidatorModule { }