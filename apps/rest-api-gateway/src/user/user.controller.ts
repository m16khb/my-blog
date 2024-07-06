import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateUserRequest,
  FindOneUserRequest,
  RPC_USER_SERVICE_NAME,
  RpcUserServiceClient,
} from '@proto/user.pb';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UserController implements OnModuleInit {
  private rpcUserService: RpcUserServiceClient;

  constructor(
    @Inject(RPC_USER_SERVICE_NAME) private readonly rpcUserClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.rpcUserService =
      this.rpcUserClient.getService<RpcUserServiceClient>('RpcUserService');
  }

  @Post()
  async createUser(@Body(new ValidationPipe()) body: any) {
    const createUserRequest = CreateUserRequest.fromPartial(body);

    return await firstValueFrom(
      this.rpcUserService.createUser(createUserRequest),
    );
  }

  @Get(':userId')
  async findOneUser(@Param('userId') userId: string) {
    const findOneUserRequest = FindOneUserRequest.fromPartial({ id: userId });

    const { user } = await firstValueFrom(
      this.rpcUserService.findOneUser(findOneUserRequest),
    );

    return user;
  }
}
