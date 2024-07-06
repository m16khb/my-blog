import { Module } from '@nestjs/common';
import { BcryptService } from '@app/crypto/bcrypt/bcrypt.service';

@Module({
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}
