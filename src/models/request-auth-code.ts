import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserRequest } from './user-request';

@Entity('request_auth_codes')
export class RequestAuthCode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserRequest, userRequest => userRequest.authCode, { onDelete: 'CASCADE' })
  userRequest: UserRequest;

  @Column('varchar')
  code: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ default: false, type: 'bool' })
  used: boolean;
}
