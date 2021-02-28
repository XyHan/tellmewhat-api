import { TicketInterface } from '../../../domain/model/ticket.model';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ticket' })
export class TicketEntity implements TicketInterface {
  @PrimaryGeneratedColumn({ name: 'id' }) private id: number;

  @Column({ type: 'datetime', name: 'created_at', nullable: false }) public createdAt: Date;

  @Column({ type: 'varchar', length: 38, name: 'created_by', nullable: false }) public createdBy: string;

  @Column({ type: 'text', name: 'description' , nullable: false }) public description: string;

  @Column({ type: 'int', name: 'status' , nullable: false }) public status: number;

  @Column({ type: 'varchar', length: 200, name: 'subject' , nullable: false }) public subject: string;

  @Column({ type: 'datetime', name: 'updated_at', nullable: false }) public updatedAt: Date;

  @Column({ type: 'varchar', length: 38, name: 'updated_by', nullable: false }) public updatedBy: string;

  @Index('IDX_TICKET_UUID')
  @Column({ type: 'varchar', length: 38, name: 'uuid' , nullable: false, unique: true }) public uuid: string;
}
