import { Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BcryptService implements OnModuleInit {
  private saltRounds: string;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit(): Promise<void> {
    this.saltRounds = await bcrypt.genSalt(
      +this.configService.get<number>('SALT_ROUNDS'),
    );
  }

  async hash(plainText: string): Promise<string> {
    return await bcrypt.hash(plainText, this.saltRounds);
  }

  async compare(existText: string, compareText: string) {
    return await bcrypt.compare(compareText, existText);
  }
}
