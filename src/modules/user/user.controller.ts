import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UpdateUserRequestDto } from './models/dto/request/update-user.request.dto';
import { UserService } from './services/user.service';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('me')
  public async findMy(): Promise<string> {
    return await this.userService.findOne(12);
  }

  @ApiBearerAuth()
  @Put('me')
  public async update(
    @Body() updateUserDto: UpdateUserRequestDto,
  ): Promise<string> {
    return await this.userService.update(12, updateUserDto);
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<string> {
    return await this.userService.findOne(+id);
  }
}
