import * as argon from 'argon2';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.reposiroty';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserDto } from './dto/user.dto';
import { CreateUserResponse } from './user.types';
import { SingInDto } from './dto/sing-in.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(user: CreateUserDto): Promise<CreateUserResponse> {
    const userExist = await this.userRepository.checkExistUser({
      phone: user.phone,
      login: user.login,
    });
    if (userExist) {
      throw new ConflictException('User already exist');
    }

    const hash = await argon.hash(user.password);
    const result = await this.userRepository.createUser({
      passwordHash: hash,
      ...user,
    });

    return {
      firstName: result.firstName,
      lastName: result.lastName,
      phone: result.phone,
      userId: result.userId,
    };
  }

  async findAll(getUserFilterDto: GetUsersFilterDto): Promise<{
    items: UserDto[];
    total: number;
  }> {
    const { items: users, total } =
      await this.userRepository.findAndCount(getUserFilterDto);
    const dtos = users.map((user) => new UserDto(user));
    return { items: dtos, total };
  }

  async findOne(id: string): Promise<UserDto> {
    const dto = new UserDto(await this.userRepository.findById(id));
    return dto;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateUser({ userId: id, ...updateUserDto });
  }

  remove(id: string) {
    return this.userRepository.deleteUser(id);
  }

  async verification({ login, password }: SingInDto): Promise<boolean> {
    const user = await this.userRepository.findByLogin(login);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return argon.verify(user.passwordHash, password);
  }
}
