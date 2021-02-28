import { TicketInterface } from '../../../domain/model/ticket.model';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'ticket' })
export class TicketEntity implements TicketInterface {
  @Exclude()
  @PrimaryGeneratedColumn({ name: 'id' }) private id: number;

  @Expose()
  @Column({ type: 'datetime', name: 'created_at', nullable: false }) public createdAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'created_by', nullable: false }) public createdBy: string;

  @Expose()
  @Column({ type: 'text', name: 'description' , nullable: false }) public description: string;

  @Expose()
  @Column({ type: 'int', name: 'status' , nullable: false }) public status: number;

  @Expose()
  @Column({ type: 'varchar', length: 200, name: 'subject' , nullable: false }) public subject: string;

  @Expose()
  @Column({ type: 'datetime', name: 'updated_at', nullable: false }) public updatedAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'updated_by', nullable: false }) public updatedBy: string;

  @Expose()
  @Index('IDX_TICKET_UUID')
  @Column({ type: 'varchar', length: 38, name: 'uuid' , nullable: false, unique: true }) public uuid: string;
}
