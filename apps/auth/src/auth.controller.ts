import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RpcAuthServiceController,
  RpcAuthServiceControllerMethods,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '@proto/auth.pb';

@Controller()
@RpcAuthServiceControllerMethods()
export class AuthController implements RpcAuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async logIn(loginRequest: LoginRequest): Promise<LoginResponse> {
    return this.authService.logIn(loginRequest);
  }

  async logOut(logoutRequest: LogoutRequest): Promise<LogoutResponse> {
    return this.authService.logOut(logoutRequest);
  }

  async validateToken(
    validateTokenRequest: ValidateTokenRequest,
  ): Promise<ValidateTokenResponse> {
    return this.authService.validateToken(validateTokenRequest);
  }
}
