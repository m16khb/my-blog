import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { HardDeletableEntity } from '@app/util/entity/hard.deletable.entity';
import { UserEntity } from './user.entity';

@Entity('tokens')
export class TokenEntity extends HardDeletableEntity {
  @Column({ type: 'text' })
  accessToken: string;

  @Column({ type: 'text' })
  refreshToken: string;

  @Column({ type: 'timestamp' })
  expiredAt: Date;

  @OneToOne(() => UserEntity, (user) => user.token)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
