import { UserInterface } from '../../../domain/model/user/user.model';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'user' })
export class UserEntity implements UserInterface {
  @Exclude()
  @PrimaryGeneratedColumn({ name: 'id' }) private id: number;

  @Expose()
  @Column({ type: 'datetime', name: 'created_at', nullable: false }) public createdAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'created_by', nullable: false }) public createdBy: string;

  @Expose()
  @Index('IDX_USER_EMAIL')
  @Column({ type: 'varchar', length: 200, name: 'email', nullable: false, unique: true  }) public email: string;

  @Expose()
  @Column({ type: 'varchar', name: 'password', nullable: false }) public password: string;

  @Expose()
  @Column({ type: 'varchar', name: 'salt', nullable: false }) public salt: string;

  @Expose()
  @Column({ type: 'datetime', name: 'updated_at', nullable: false }) public updatedAt: Date;

  @Expose()
  @Column({ type: 'varchar', length: 38, name: 'updated_by', nullable: false }) public updatedBy: string;

  @Expose()
  @Index('IDX_USER_UUID')
  @Column({ type: 'varchar', length: 38, name: 'uuid' , nullable: false, unique: true }) public uuid: string;
}
