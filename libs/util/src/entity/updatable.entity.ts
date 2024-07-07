import { Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Updatable } from '@app/util';

export abstract class UpdatableEntity implements Updatable {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  updatedBy: string;
}
