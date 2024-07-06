import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RpcAuthServiceController,
  RpcAuthServiceControllerMethods,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '@proto/auth.pb';

@Controller()
@RpcAuthServiceControllerMethods()
export class AuthController implements RpcAuthServiceController {
  constructor(private readonly authService: AuthService) {}

  async validateToken(
    validateTokenRequest: ValidateTokenRequest,
  ): Promise<ValidateTokenResponse> {
    return this.authService.validateToken(validateTokenRequest);
  }
}
