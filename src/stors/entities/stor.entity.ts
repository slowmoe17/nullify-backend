import { Column, Entity } from 'typeorm';

@Entity()
export class Stor {
  @Column()
  Owner: string;

  @Column()
  storeName: string;

  @Column()
  Logo: string;

  @Column()
  Description: string;

  @Column()
  storeAddress: string;
}
