import { Controller, UseFilters, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  FindOneUserByLoginIdRequest,
  FindOneUserByLoginIdResponse,
  FindOneUserRequest,
  FindOneUserResponse,
  RpcUserServiceController,
  RpcUserServiceControllerMethods,
  UpdateUserRequest,
  UpdateUserResponse,
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
    console.log(findOneUserRequest);
    return this.userService.findOneUser(findOneUserRequest);
  }

  async findOneUserByLoginId(
    findOneUserByLoginIdRequest: FindOneUserByLoginIdRequest,
  ): Promise<FindOneUserByLoginIdResponse> {
    return this.userService.findOneUserByLoginId(findOneUserByLoginIdRequest);
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
