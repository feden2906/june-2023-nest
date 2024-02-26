import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { CacheCustom } from '../../../common/decorators/cache-method.decorator';
import { UserRepository } from '../../repository/services/user.repository';
import { CreateUserDto } from '../models/dto/request/create-user.dto';
import { UpdateUserDto } from '../models/dto/request/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(createUserDto: CreateUserDto): Promise<any> {
    return 'This action adds a new user';
  }

  public async findAll(): Promise<string> {
    return `This action returns all user`;
  }

  @CacheCustom(5000)
  public async findOne(id: number): Promise<string> {
    throw new UnprocessableEntityException('User not found');
    return `This action returns a #${id} user`;
  }

  public async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return `This action updates a #${id} user`;
  }

  public async remove(id: number): Promise<string> {
    return `This action removes a #${id} user`;
  }
}
