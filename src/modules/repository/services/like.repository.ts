import { DataSource, Repository } from 'typeorm';

import { LikeEntity } from '../../../database/entities/like.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikeRepository extends Repository<LikeEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(LikeEntity, dataSource.manager);
  }
}
