import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import {
  CreateUserRequest,
  DeleteUserRequest,
  FindOneUserRequest,
  RPC_USER_SERVICE_NAME,
  RpcUserServiceClient,
  UpdateUserRequest,
} from '@proto/user.pb';
import { firstValueFrom } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { createProxy } from '@app/util';

@Controller('users')
export class UserController implements OnModuleInit {
  private grpcStubUserService: RpcUserServiceClient;

  constructor(
    @Inject('GRPC_USER_CLIENT') private readonly rpcUserClient: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.grpcStubUserService = createProxy<RpcUserServiceClient>(
      this.rpcUserClient.getService<RpcUserServiceClient>(
        RPC_USER_SERVICE_NAME,
      ),
    );
  }

  @Post()
  async createUser(@Body(new ValidationPipe()) body: any) {
    const createUserRequest = CreateUserRequest.fromPartial(body);

    return await firstValueFrom(
      this.grpcStubUserService.createUser(createUserRequest),
    );
  }

  @Get(':userId')
  async findOneUser(@Param('userId') userId: string) {
    const findOneUserRequest = FindOneUserRequest.fromPartial({ id: userId });

    const { user } = await firstValueFrom(
      this.grpcStubUserService.findOneUser(findOneUserRequest),
    );

    return user;
  }

  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body(new ValidationPipe()) body: any,
  ) {
    const updateUserRequest = UpdateUserRequest.fromPartial(body);
    return await firstValueFrom(
      this.grpcStubUserService.updateUser(updateUserRequest),
    );
  }

  @Delete(':userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('userId') userId: string) {
    const deleteUserRequest = DeleteUserRequest.fromPartial({ id: userId });

    return await firstValueFrom(
      this.grpcStubUserService.deleteUser(deleteUserRequest),
    );
  }
}
