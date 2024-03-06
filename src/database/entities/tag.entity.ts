import { Column, Entity, ManyToMany, VirtualColumn } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseEntity } from './models/base.entity';

@Entity(TableNameEnum.TAGS)
export class TagEntity extends BaseEntity {
  @Column('text')
  name: string;

  @ManyToMany(() => ArticleEntity, (entity) => entity.tags)
  articles?: ArticleEntity[];

  @VirtualColumn({ query: () => 'NULL' })
  articlesCount: number;
}
