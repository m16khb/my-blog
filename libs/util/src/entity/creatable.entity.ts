import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Creatable } from '@app/util/interface/creatable.interface';

export abstract class CreatableEntity implements Creatable {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  createdBy: string;
}
