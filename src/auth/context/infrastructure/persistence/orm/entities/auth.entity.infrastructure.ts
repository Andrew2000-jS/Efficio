import { AuthPrimitives } from 'src/auth/context/domain/auth.entity';
import { User } from 'src/users/context/infrastructure';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class Auth implements AuthPrimitives {
  @PrimaryColumn()
  id: string;

  userId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string | null;

  @Column({ nullable: true })
  otpCode: string | null;

  @OneToOne(() => User, (user) => user.auth, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
