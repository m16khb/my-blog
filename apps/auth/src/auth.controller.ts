import { Controller, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  GenerateTokenRequest,
  GenerateTokenResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  RpcAuthServiceController,
  RpcAuthServiceControllerMethods,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '@proto/auth.pb';
import { RpcExceptionFilter } from '@app/filter';

@Controller()
@UseFilters(RpcExceptionFilter)
@RpcAuthServiceControllerMethods()
export class AuthController implements RpcAuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async logIn(loginRequest: LoginRequest): Promise<LoginResponse> {
    return this.authService.logIn(loginRequest);
  }

  async logOut(logoutRequest: LogoutRequest): Promise<LogoutResponse> {
    return this.authService.logOut(logoutRequest);
  }

  async generateToken(
    generateTokenRequest: GenerateTokenRequest,
  ): Promise<GenerateTokenResponse> {
    return this.authService.generateToken(generateTokenRequest);
  }

  async validateToken(
    validateTokenRequest: ValidateTokenRequest,
  ): Promise<ValidateTokenResponse> {
    return this.authService.validateToken(validateTokenRequest);
  }
}
