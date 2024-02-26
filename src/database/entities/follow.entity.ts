import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';
import { TableNameEnum } from './enums/table-name.enum';

@Entity(TableNameEnum.FOLLOWS)
export class FollowEntity extends BaseEntity {
  @Column()
  follower_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followers)
  @JoinColumn({ name: 'follower_id' })
  follower?: UserEntity;

  @Column()
  following_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followings)
  @JoinColumn({ name: 'following_id' })
  following?: UserEntity;
}
