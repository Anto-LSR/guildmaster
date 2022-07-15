import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Character } from '../character/character.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  battleTag: string;

  @Column({ nullable: true })
  apiToken: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  bnetId: string;

  @OneToMany(() => Character, (character) => character.user)
  characters: Character[];

  @Column({ nullable: true })
  selectedCharacter: string;

  @Column()
  bnetLinked: boolean;

  @Column()
  tokenCreatedAt: string;
}
