import { TicketModel } from '../../../domain/model/ticket.model';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ticket' })
export class TicketEntity extends TicketModel {
  @PrimaryGeneratedColumn({ name: 'id' }) private _id: number;

  @Column({ type: 'datetime', name: 'created_at', nullable: false }) protected _createdAt: Date;

  @Column({ type: 'varchar', length: 38, name: 'created_by', nullable: false }) protected _createdBy: string;

  @Column({ type: 'text', name: 'description' , nullable: false }) protected _description: string;

  @Column({ type: 'int', name: 'status' , nullable: false }) protected _status: number;

  @Column({ type: 'varchar', length: 200, name: 'subject' , nullable: false }) protected _subject: string;

  @Column({ type: 'datetime', name: 'updated_at', nullable: false }) protected _updatedAt: Date;

  @Column({ type: 'varchar', length: 38, name: 'updated_by', nullable: false }) protected _updatedBy: string;

  @Index('IDX_TICKET_UUID')
  @Column({ type: 'varchar', length: 38, name: 'uuid' , nullable: false, unique: true }) protected _uuid: string;
}
