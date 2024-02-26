import { DataSource, Repository } from 'typeorm';

import { TagEntity } from '../../../database/entities/tag.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagRepository extends Repository<TagEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TagEntity, dataSource.manager);
  }
}
