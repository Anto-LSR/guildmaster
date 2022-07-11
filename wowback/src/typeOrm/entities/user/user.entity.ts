import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  battleTag: string;

  @Column()
  apiToken: string;

  @Column()
  password: string;

  @Column()
  bnetId: string;

  @Column()
  selectedCharacter: string;

}
