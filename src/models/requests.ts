import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRequest } from './user-request';

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => UserRequest, userRequest => userRequest.request)
  userRequests: UserRequest[];
}
