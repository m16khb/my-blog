import { Column, Entity } from 'typeorm';
import { CommonEntity } from '@app/util';

@Entity('users')
export class UserEntity extends CommonEntity {
  @Column({ type: 'varchar', length: 255 })
  loginId: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}
