import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { createProxy } from '@app/util';
import {
  LoginRequest,
  RPC_AUTH_SERVICE_NAME,
  RpcAuthServiceClient,
} from '@proto/auth.pb';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { LoginRequestDto } from './dto/login.request.dto';

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

  @Post('login')
  async logIn(@Body(new ValidationPipe()) loginRequestDto: LoginRequestDto) {
    const loginRequest = LoginRequest.fromPartial(loginRequestDto);

    return await firstValueFrom(this.grpcStubAuthService.logIn(loginRequest));
  }
}
