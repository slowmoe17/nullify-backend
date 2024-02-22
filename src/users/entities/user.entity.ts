import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPass(): Promise<void> {
    if (this.password) {
      const saltRound = 10;
      this.password = await bcrypt.hash(this.password, saltRound);
    }
  }
}
