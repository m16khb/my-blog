import { Controller, UseFilters } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  FindOneUserRequest,
  FindOneUserResponse,
  RpcUserServiceController,
  RpcUserServiceControllerMethods,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@proto/user.pb';
import { RpcExceptionFilter } from '@app/filter';

@Controller()
@UseFilters(RpcExceptionFilter)
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

  async updateUser(
    updateUserRequest: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    return this.userService.updateUser(updateUserRequest);
  }

  async deleteUser(
    deleteUserRequest: DeleteUserRequest,
  ): Promise<DeleteUserResponse> {
    return this.userService.deleteUser(deleteUserRequest);
  }
}
