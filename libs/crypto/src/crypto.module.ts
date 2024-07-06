import { Module } from '@nestjs/common';
import { BcryptModule } from '@app/crypto/bcrypt/bcrypt.module';

@Module({
  imports: [BcryptModule],
  exports: [BcryptModule],
})
export class CryptoModule {}
