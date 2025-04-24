import * as crypto from 'node:crypto';
import * as argon from 'argon2';
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.reposiroty';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserDto } from './dto/user.dto';
import { CreateUserResponse } from './user.types';

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

    const salt = crypto.randomBytes(32);
    const hash = await argon.hash(user.password, { salt });

    const result = await this.userRepository.createUser({
      passwordHash: hash,
      passwordSalt: salt.toString('hex'),
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
}
