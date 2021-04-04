import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose, Type } from 'class-transformer';
import { TicketEntity } from './ticket.entity';
import { MediaInterface } from '../../../domain/model/ticket/media.model';

@Entity({ name: 'media' })
export class MediaEntity implements MediaInterface {
  @Exclude()
  @PrimaryGeneratedColumn({ name: 'id' }) private id: number;

  @Expose()
  @Column({ type: 'datetime', name: 'created_at', nullable: false }) public createdAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'created_by', nullable: false }) public createdBy: string;

  @Expose()
  @Column({ type: 'varchar', name: 'filename' , nullable: false }) public filename: string;

  @Expose()
  @Column({ type: 'varchar', name: 'original_filename' , nullable: false }) public originalFilename: string;

  @Expose()
  @Column({ type: 'varchar', name: 'mime_type' , nullable: false }) public mimeType: string;

  @Expose()
  @Index('IDX_COMMENT_UUID')
  @Column({ type: 'varchar', length: 38, name: 'uuid' , nullable: false, unique: true }) public uuid: string;

  @Expose()
  @Type(() => TicketEntity)
  @ManyToOne(() => TicketEntity, ticket => ticket.media)
  @JoinColumn({ name: 'ticket_id' })
  ticket: TicketEntity;
}
