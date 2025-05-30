import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InternalAccountService } from '../../internal/account/account.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SingInDto } from './dto/sing-in.dto';
import { JwtDto, RefreshJwtDto } from './dto/jwt.dto';
import { REDIS_TOKEN } from '../../config/redis/redis.constant';
import Redis from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REDIS_TOKEN) private readonly redis: Redis,
    private readonly accountServiceInternal: InternalAccountService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(params: SingInDto): Promise<JwtDto> {
    const isPasswordCorrect =
      await this.accountServiceInternal.verification(params);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    let userId = await this.redis.get(params.login);

    if (!userId) {
      const users = await this.accountServiceInternal.GetUsersByFilter({
        login: params.login,
      });
      userId = users.items[0].userId;

      this.redis.set(params.login, userId);
    }

    const payload = { login: params.login, userId };
    const access = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      algorithm: this.config.get('JWT_ALG'),
      expiresIn: this.config.get('JWT_ACCESS_EXP'),
    });
    const refresh = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      algorithm: this.config.get('JWT_ALG'),
      expiresIn: this.config.get('JWT_REFRESH_EXP'),
    });

    return { access, refresh };
  }

  async refreshToken(params: RefreshJwtDto): Promise<JwtDto> {
    let jwtPayload: {
      userId: string;
      login: string;
    };

    try {
      jwtPayload = this.jwtService.verify(params.refresh, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        algorithms: [this.config.get('JWT_ALG')],
      });
    } catch (error: unknown) {
      console.log(error);
      throw new UnauthorizedException();
    }

    const { items: users } = await this.accountServiceInternal.GetUsersByFilter(
      {
        userIds: [jwtPayload.userId],
      },
    );

    if (users.length === 0) {
      throw new NotFoundException('User not found');
    }

    const payload = { login: users[0].login, userId: users[0].userId };
    const access = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_ACCESS_SECRET'),
      algorithm: this.config.get('JWT_ALG'),
      expiresIn: this.config.get('JWT_ACCESS_EXP'),
    });
    const refresh = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_REFRESH_SECRET'),
      algorithm: this.config.get('JWT_ALG'),
      expiresIn: this.config.get('JWT_REFRESH_EXP'),
    });

    return {
      access,
      refresh,
    };
  }
}
