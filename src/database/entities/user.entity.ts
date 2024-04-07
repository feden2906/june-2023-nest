import { Column, Entity, OneToMany } from 'typeorm';

import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { FollowEntity } from './follow.entity';
import { LikeEntity } from './like.entity';
import { BaseEntity } from './models/base.entity';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity(TableNameEnum.USERS)
export class UserEntity extends BaseEntity {
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('text', { nullable: true })
  image?: string;

  @OneToMany(() => ArticleEntity, (entity) => entity.user)
  articles?: ArticleEntity[];

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => LikeEntity, (entity) => entity.user)
  likes?: LikeEntity[];

  @OneToMany(() => CommentEntity, (entity) => entity.user)
  comments?: CommentEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.follower)
  followers?: FollowEntity[];

  @OneToMany(() => FollowEntity, (entity) => entity.following)
  followings?: FollowEntity[];
}
