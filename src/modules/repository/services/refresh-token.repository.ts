import { DataSource, Repository } from 'typeorm';

import { RefreshTokenEntity } from '../../../database/entities/refresh-token.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokenEntity, dataSource.manager);
  }
}
