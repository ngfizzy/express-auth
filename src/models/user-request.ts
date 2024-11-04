import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user';
import { Request } from './requests';
import { RequestAuthCode } from './request-auth-code';

@Entity('user_requests')
export class UserRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Request, request => request.userRequests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'request_id' })
  request: Request;

  @OneToOne(() => RequestAuthCode, authCode => authCode.userRequest, { cascade: true })
  @JoinColumn({ name: 'auth_code_id' })
  authCode: RequestAuthCode;
}
