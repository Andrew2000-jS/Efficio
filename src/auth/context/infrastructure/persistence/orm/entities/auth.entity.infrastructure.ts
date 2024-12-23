import { AuthPrimitives } from 'src/auth/context/domain/auth.entity';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('auth')
export class Auth implements AuthPrimitives {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string | null;

  @Column({ nullable: true })
  otpCode: string | null;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
