import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: false, unique: true })
  readonly username: string;

  @Column({ nullable: false, unique: true })
  readonly email: string;

  @Column({ nullable: false })
  readonly password: string;
}
