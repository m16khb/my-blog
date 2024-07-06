import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreatableEntity } from '@app/util/interface/creatable.interface';
import { UpdatableEntity } from '@app/util/interface/updatable.interface';
import { DeletableEntity } from '@app/util/interface/deletable.interface';

export abstract class CommonEntity
  implements CreatableEntity, UpdatableEntity, DeletableEntity
{
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  updatedBy: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  deletedBy: string;
}
