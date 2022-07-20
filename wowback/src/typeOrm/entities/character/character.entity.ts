import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  @OneToOne(() => User)
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  level: number;
  @Column({ nullable: true })
  class: string;
  @Column({ nullable: true })
  realm: string;
  @Column({ nullable: true })
  faction: string;
  @Column({ nullable: true })
  wowCharacterId: string;
  @Column({ nullable: true })
  race: string;
  @Column({ nullable: true })
  gender: string;
  @ManyToOne(() => User, (user) => user.characters)
  user: User;
  @Column({ nullable: true })
  avatarUrl: string;
  @Column({ nullable: true })
  mainPictureUrl: string;
  @Column({ nullable: true })
  guildName: string;
  ///////RAIDS INFO///////////
  @Column({ nullable: true })
  previousNormalProgress: string;
  @Column({ nullable: true })
  previousHeroicProgress: string;
  @Column({ nullable: true })
  previousMythicProgress: string;
  @Column({ nullable: true })
  currentNormalProgress: string;
  @Column({ nullable: true })
  currentHeroicProgress: string;
  @Column({ nullable: true })
  currentMythicProgress: string;
}
