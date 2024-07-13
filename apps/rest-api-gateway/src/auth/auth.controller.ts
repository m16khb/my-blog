import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthUser, createProxy, Public } from '@app/util';
import {
  LoginRequest,
  LogoutRequest,
  RPC_AUTH_SERVICE_NAME,
  RpcAuthServiceClient,
} from '@proto/auth.pb';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login.request.dto';
import { JwtGuard } from '@app/guard';
import { User } from '@proto/user.pb';

@Controller()
@ApiTags('auth')
export class AuthController implements OnModuleInit {
  private grpcStubAuthService: RpcAuthServiceClient;

  constructor(
    @Inject('GRPC_AUTH_CLIENT') private readonly rpcAuthClient: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.grpcStubAuthService = createProxy<RpcAuthServiceClient>(
      this.rpcAuthClient.getService<RpcAuthServiceClient>(
        RPC_AUTH_SERVICE_NAME,
      ),
    );
  }

  @Public()
  @Post('login')
  async logIn(@Body(new ValidationPipe()) loginRequestDto: LoginRequestDto) {
    const loginRequest = LoginRequest.fromPartial(loginRequestDto);

    return await firstValueFrom(this.grpcStubAuthService.logIn(loginRequest));
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logOut(@AuthUser() user: User) {
    return await firstValueFrom(
      this.grpcStubAuthService.logOut(
        LogoutRequest.create({ userId: user.id }),
      ),
    );
  }
}
