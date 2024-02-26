import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async asdasd() {
    return await this.find();
  }
}
