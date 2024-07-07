import { LoginRequest } from '@proto/auth.pb';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto implements Omit<LoginRequest, '$type'> {
  @ApiProperty({ type: 'string', example: 'm16khb' })
  @IsString()
  loginId?: string;

  @ApiProperty({ type: 'string', example: 'qlxkals1!' })
  @IsString()
  password?: string;
}
