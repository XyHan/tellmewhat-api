import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { TicketEntity } from './ticket.entity';
import { HistoryInterface } from '../../../domain/model/ticket/history.model';

@Entity({ name: 'history' })
export class HistoryEntity implements HistoryInterface {
  @Exclude()
  @PrimaryGeneratedColumn({ name: 'id' }) private id: number;

  @Expose()
  @Column({ type: 'datetime', name: 'created_at', nullable: false }) public createdAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'created_by', nullable: false }) public createdBy: string;

  @Expose()
  @Column({ type: 'datetime', name: 'updated_at', nullable: false }) public updatedAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'updated_by', nullable: false }) public updatedBy: string;

  @Expose()
  @Column({ type: 'int', name: 'status' , nullable: false }) public status: number;

  @Expose()
  @Index('IDX_COMMENT_UUID')
  @Column({ type: 'varchar', length: 38, name: 'uuid' , nullable: false, unique: true }) public uuid: string;

  @Expose()
  @Column({ type: 'varchar', length: 200, name: 'description' , nullable: true }) public description: string | null;

  @Expose()
  @Column({ type: 'int', name: 'type' , nullable: false }) public type: number;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'type_uuid' , nullable: true }) public typeUuid: string | null;

  @Expose()
  @Type(() => TicketEntity)
  @ManyToOne(() => TicketEntity, ticket => ticket.comments)
  @JoinColumn({ name: 'ticket_id' })
  ticket: TicketEntity;
}
