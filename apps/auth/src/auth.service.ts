import { Injectable } from '@nestjs/common';
import { ValidateTokenRequest, ValidateTokenResponse } from '@proto/auth.pb';

@Injectable()
export class AuthService {
  constructor() {}

  async validateToken(
    validateTokenRequest: ValidateTokenRequest,
  ): Promise<ValidateTokenResponse> {
    console.log(validateTokenRequest, 'validateTokenRequest');
    return ValidateTokenResponse.fromPartial({ valid: true });
  }
}
