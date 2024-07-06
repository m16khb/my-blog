import { Injectable } from '@nestjs/common';
import {
  CreateUserRequest,
  CreateUserResponse,
  DeleteUserRequest,
  DeleteUserResponse,
  FindOneUserRequest,
  FindOneUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@proto/user.pb';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { status } from '@grpc/grpc-js';
import { BcryptService } from '@app/crypto/bcrypt/bcrypt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly bcryptService: BcryptService,
  ) {}

  async createUser(
    createUserRequest: CreateUserRequest,
  ): Promise<CreateUserResponse> {
    console.log(createUserRequest, 'createUserRequest');
    const { loginId } = createUserRequest;

    const existUser = await this.userRepository.findOne({ where: { loginId } });

    if (existUser) {
      throw new RpcException({
        code: status.ALREADY_EXISTS,
        message: 'User already exists',
      });
    }

    try {
      createUserRequest.password = await this.bcryptService.hash(
        createUserRequest.password,
      );
    } catch (error) {
      console.error(error);
    }

    const creatableUser = this.userRepository.create(createUserRequest);
    const createdUser = await this.userRepository.save(creatableUser);

    return CreateUserResponse.fromPartial(createdUser);
  }

  async findOneUser(
    findOneUserRequest: FindOneUserRequest,
  ): Promise<FindOneUserResponse> {
    console.log(findOneUserRequest, 'findOneUserRequest');

    const { id } = findOneUserRequest;

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      console.error('User not found');
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    delete user.password;

    return FindOneUserResponse.fromPartial({ user });
  }

  async updateUser(
    updateUserRequest: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    console.log(updateUserRequest, 'updateUserRequest');

    const { user: existUser } = await this.findOneUser(
      FindOneUserRequest.fromPartial(updateUserRequest),
    );

    const updatableUser = this.userRepository.merge(
      this.userRepository.create(existUser),
      updateUserRequest,
    );

    const updatedUser = await this.userRepository.save(updatableUser);

    return UpdateUserResponse.fromPartial({ id: updatedUser.id });
  }

  async deleteUser(
    deleteUserRequest: DeleteUserRequest,
  ): Promise<DeleteUserResponse> {
    console.log(deleteUserRequest, 'deleteUserRequest');

    const { user: existUser } = await this.findOneUser(
      FindOneUserRequest.fromPartial(deleteUserRequest),
    );

    const deletedUser = await this.userRepository.save({
      ...existUser,
      deletedAt: new Date(),
      deletedBy: '0',
    } as UserEntity);

    return DeleteUserResponse.fromPartial({ id: deletedUser.id });
  }
}
