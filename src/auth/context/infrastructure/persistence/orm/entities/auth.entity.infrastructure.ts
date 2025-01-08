import { AuthPrimitives } from '@auth/context/domain';
import { User } from '@users/context/infrastructure';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class Auth implements AuthPrimitives {
  @PrimaryColumn()
  id: string;

  @OneToOne(() => User, (user) => user.auth, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  otpCode: string | null;

  @Column({ nullable: true })
  token: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
