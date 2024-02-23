import { Column, Entity } from 'typeorm';

import { BaseEntity } from './models/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('text', { nullable: true })
  name?: string;

  @Column('text')
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('int', { nullable: true })
  age: number;
}
