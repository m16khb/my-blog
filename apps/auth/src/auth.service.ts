import { Injectable } from '@nestjs/common';
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '@proto/auth.pb';

@Injectable()
export class AuthService {
  constructor() {}

  async logIn(loginRequest: LoginRequest): Promise<LoginResponse> {
    console.log(loginRequest, 'loginRequest');
    return undefined;
  }

  async logOut(logoutRequest: LogoutRequest): Promise<LogoutResponse> {
    console.log(logoutRequest, 'logoutRequest');
    return undefined;
  }

  async validateToken(
    validateTokenRequest: ValidateTokenRequest,
  ): Promise<ValidateTokenResponse> {
    console.log(validateTokenRequest, 'validateTokenRequest');
    return ValidateTokenResponse.fromPartial({ valid: true });
  }
}
