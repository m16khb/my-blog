import { Injectable } from '@nestjs/common';
import {
  CreateUserRequest,
  CreateUserResponse,
  FindOneUserRequest,
  FindOneUserResponse,
} from '@proto/user.pb';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  private readonly userRepository = [{ id: '1', name: 'John Doe' }];

  constructor() {}

  async createUser(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    console.log(createUserRequest, 'createUserRequest');

    const { name } = createUserRequest;

    const existUser = this.userRepository.find((user) => user.name === name);

    if (existUser) {
      throw new RpcException('User already exists');
    }

    const creatableUser = {
      id: `${+this.userRepository[this.userRepository.length - 1].id + 1}`,
      name,
    };

    this.userRepository.push(creatableUser);

    const createdUser = this.userRepository.find(
      (user) => user.id === creatableUser.id,
    );

    return CreateUserResponse.fromPartial(createdUser);
  }

  async findOneUser(
    findOneUserRequest: FindOneUserRequest,
  ): Promise<FindOneUserResponse> {
    console.log(findOneUserRequest, 'findOneUserRequest');

    const user = this.userRepository.find(
      (user) => user.id === findOneUserRequest.id,
    );

    return FindOneUserResponse.fromPartial({ user });
  }
}
