import { Auth } from '@auth/context/infrastructure';
import { UserPrimitives } from '@users/context/domain';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User implements UserPrimitives {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'date' })
  birthday: Date;

  @OneToOne(() => Auth, (auth) => auth.user, { onDelete: 'CASCADE' })
  auth: Auth;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
