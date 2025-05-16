import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserDto } from './dto/user.dto';
import { SingInDto } from './dto/sing-in.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/verification')
  verification(@Query() dto: SingInDto): Promise<boolean> {
    return this.userService.verification(dto);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('/balance')
  balance(@Body() body): Promise<void> {
    return this.userService.changeBalance(body);
  }

  @Get()
  findAll(
    @Query() getUserFilterDto: GetUsersFilterDto,
  ): Promise<{ items: UserDto[]; total: number }> {
    return this.userService.findAll(getUserFilterDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
