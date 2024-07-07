import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Creatable } from '@app/util/interface/creatable.interface';
import { Updatable } from '@app/util/interface/updatable.interface';

export abstract class HardDeletableEntity implements Creatable, Updatable {
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
}
