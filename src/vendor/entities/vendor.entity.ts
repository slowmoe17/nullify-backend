import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Vendor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  vendor_plan: string;

  @Column()
  vendor_specialties: string;

  @Column()
  is_registered: boolean;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
