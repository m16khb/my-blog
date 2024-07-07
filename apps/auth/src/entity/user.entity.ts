import { Column, Entity, OneToOne } from 'typeorm';
import { CommonEntity } from '@app/util';
import { TokenEntity } from './token.entity';

@Entity('users')
export class UserEntity extends CommonEntity {
  @Column({ type: 'varchar', length: 255 })
  loginId: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToOne(() => TokenEntity, (token) => token.user)
  token: TokenEntity;
}
