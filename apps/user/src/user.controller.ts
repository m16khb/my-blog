import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequest,
  CreateUserResponse,
  RpcUserServiceController,
  RpcUserServiceControllerMethods,
} from '@proto/user.pb';

@Controller()
@RpcUserServiceControllerMethods()
export class UserController implements RpcUserServiceController {
  constructor(private readonly userService: UserService) {}

  createUser(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    console.log(createUserRequest);
    return undefined;
  }
}
