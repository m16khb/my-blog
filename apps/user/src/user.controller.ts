import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequest,
  CreateUserResponse,
  FindOneUserRequest,
  FindOneUserResponse,
  RpcUserServiceController,
  RpcUserServiceControllerMethods,
} from '@proto/user.pb';

@Controller()
@RpcUserServiceControllerMethods()
export class UserController implements RpcUserServiceController {
  constructor(private readonly userService: UserService) {}

  async createUser(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    return this.userService.createUser(createUserRequest);
  }

  async findOneUser(
    findOneUserRequest: FindOneUserRequest,
  ): Promise<FindOneUserResponse> {
    return this.userService.findOneUser(findOneUserRequest);
  }
}
