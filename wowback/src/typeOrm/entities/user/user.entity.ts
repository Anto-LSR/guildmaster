import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable : true})
  username: string;

  @Column()
  email: string;

  @Column({nullable : true})
  battleTag: string;

  @Column({nullable : true})
  apiToken: string;

  @Column()
  password: string;

  @Column({nullable : true})
  bnetId: string;

  @Column({nullable : true})
  selectedCharacter: string;

}
