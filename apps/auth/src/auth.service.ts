import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  GenerateTokenRequest,
  GenerateTokenResponse,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  ValidateTokenRequest,
  ValidateTokenResponse,
} from '@proto/auth.pb';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import * as console from 'node:console';
import {
  FindOneUserByLoginIdRequest,
  FindOneUserRequest,
  FindOneUserResponse,
  RPC_USER_SERVICE_NAME,
  RpcUserServiceClient,
} from '@proto/user.pb';
import { createProxy } from '@app/util';
import { firstValueFrom } from 'rxjs';
import { BcryptService } from '@app/crypto/bcrypt/bcrypt.service';
import { status } from '@grpc/grpc-js';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entity/token.entity';
import { Repository } from 'typeorm';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

@Injectable()
export class AuthService implements OnModuleInit {
  private grpcStubUserService: RpcUserServiceClient;

  constructor(
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @Inject('GRPC_USER_CLIENT') private readonly rpcUserClient: ClientGrpc,
    @InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>,
  ) {}

  onModuleInit(): void {
    this.grpcStubUserService = createProxy<RpcUserServiceClient>(
      this.rpcUserClient.getService<RpcUserServiceClient>(
        RPC_USER_SERVICE_NAME,
      ),
    );
  }

  async logIn(loginRequest: LoginRequest): Promise<LoginResponse> {
    console.log(loginRequest, 'loginRequest');

    const { loginId, password } = loginRequest;

    const { user: existUser } = await firstValueFrom(
      this.grpcStubUserService.findOneUserByLoginId(
        FindOneUserByLoginIdRequest.fromPartial({ loginId }),
      ),
    );

    const isValid: boolean = await this.bcryptService.compare(
      existUser.password,
      password,
    );

    if (!isValid) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'Invalid password',
      });
    }

    const { token: existToken } = await handleRpcException<{
      token: TokenEntity;
    }>(this.findOneTokenByUserId({ userId: existUser.id }), {
      notFoundValue: { token: null },
    });

    const { token } = await this.generateToken(
      GenerateTokenRequest.fromPartial({ user: existUser }),
    );

    const _creatableToken = existToken
      ? this.tokenRepository.merge(existToken, {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          updatedBy: existUser.id,
          expiredAt: dayjs().utc().add(1, 'hour'),
        })
      : this.tokenRepository.create({
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
          updatedBy: existUser.id,
          createdBy: existUser.id,
          expiredAt: dayjs().utc().add(1, 'hour'),
          user: existUser,
        });

    const creatableToken = this.tokenRepository.create(_creatableToken);
    const createdToken = await this.tokenRepository.save(creatableToken);

    return LoginResponse.create({
      token: {
        accessToken: createdToken.accessToken,
        refreshToken: createdToken.refreshToken,
      },
    });
  }

  async logOut(logoutRequest: LogoutRequest): Promise<LogoutResponse> {
    console.log(logoutRequest, 'logoutRequest');

    const { userId } = logoutRequest;

    const { user: existUser } = await handleRpcException<FindOneUserResponse>(
      firstValueFrom(
        this.grpcStubUserService.findOneUser(
          FindOneUserRequest.create({ id: userId }),
        ),
      ),
      {
        notFoundValue: FindOneUserResponse.create({ user: null }),
      },
    );

    if (!existUser) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'User not found',
      });
    }

    const { token: existToken } = await handleRpcException<{
      token: TokenEntity;
    }>(this.findOneTokenByUserId({ userId: existUser.id }), {
      notFoundValue: { token: null },
    });

    if (!existToken) {
      throw new RpcException({
        code: status.INVALID_ARGUMENT,
        message: 'Already logged out',
      });
    }

    await this.tokenRepository.delete({ user: { id: userId } });

    return LogoutResponse.create({ success: true });
  }

  async generateToken(
    generateTokenRequest: GenerateTokenRequest,
  ): Promise<GenerateTokenResponse> {
    console.log(generateTokenRequest, 'generateTokenRequest');

    const { user } = generateTokenRequest;

    const accessToken = await this.jwtService.signAsync(
      { user },
      { expiresIn: '1h' },
    );
    const refreshToken = await this.jwtService.signAsync(
      { user },
      { expiresIn: '30d' },
    );

    return GenerateTokenResponse.fromPartial({
      token: { accessToken, refreshToken },
    });
  }

  async validateToken(
    validateTokenRequest: ValidateTokenRequest,
  ): Promise<ValidateTokenResponse> {
    console.log(validateTokenRequest, 'validateTokenRequest');
    return undefined;
  }

  async findOneTokenByUserId(findOneTokenByUserIdRequest: {
    userId: string;
  }): Promise<{ token: TokenEntity }> {
    console.log(findOneTokenByUserIdRequest, 'findOneTokenByUserIdRequest');

    const { userId } = findOneTokenByUserIdRequest;

    const existToken = await this.tokenRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!existToken) {
      throw new RpcException({
        code: status.NOT_FOUND,
        message: 'Token not found',
      });
    }

    return { token: existToken };
  }
}

type RpcExceptionHandlerOptions<T> = {
  notFoundValue?: T;
  customExceptionHandler?: (error: RpcException) => T | null;
};

async function handleRpcException<T>(
  promise: Promise<T>,
  options: RpcExceptionHandlerOptions<T> = {},
): Promise<T | null> {
  const { notFoundValue = null, customExceptionHandler } = options;

  try {
    return await promise;
  } catch (error) {
    if (error instanceof RpcException) {
      const rpcError = error.getError() as { code: number; message: string };

      if (customExceptionHandler) {
        return customExceptionHandler(error);
      }

      switch (rpcError.code) {
        case status.NOT_FOUND:
          return notFoundValue;
        default:
          throw error;
      }
    }
    throw error;
  }
}
