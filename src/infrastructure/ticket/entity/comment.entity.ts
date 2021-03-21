import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { CommentInterface } from '../../../domain/model/ticket/comment.model';
import { TicketEntity } from './ticket.entity';

@Entity({ name: 'comment' })
export class CommentEntity implements CommentInterface {
  @Exclude()
  @PrimaryGeneratedColumn({ name: 'id' }) private id: number;

  @Expose()
  @Column({ type: 'datetime', name: 'created_at', nullable: false }) public createdAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'created_by', nullable: false }) public createdBy: string;

  @Expose()
  @Column({ type: 'int', name: 'status' , nullable: false }) public status: number;

  @Expose()
  @Column({ type: 'text', name: 'content' , nullable: false }) public content: string;

  @Expose()
  @Column({ type: 'datetime', name: 'updated_at', nullable: false }) public updatedAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'updated_by', nullable: false }) public updatedBy: string;

  @Expose()
  @Index('IDX_COMMENT_UUID')
  @Column({ type: 'varchar', length: 38, name: 'uuid' , nullable: false, unique: true }) public uuid: string;

  @Expose()
  @Type(() => TicketEntity)
  @ManyToOne(() => TicketEntity, ticket => ticket.comments)
  @JoinColumn({ name: 'ticket_id' })
  ticket: TicketEntity;
}
