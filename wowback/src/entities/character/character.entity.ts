import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Dungeon_run } from '../dungeon_runs/dungeon_runs.entity';
import { User } from '../user/user.entity';

@Entity()
export class Character {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  level: number;

  @Column({ nullable: true })
  class: string;

  @Column({ nullable: true })
  activeSpec: string;

  @Column({ nullable: true })
  specId: string;

  @Column({ nullable: true })
  ilvl: number;

  @Column('longtext', { nullable: true })
  gear: string;

  @Column('longtext', { nullable: true })
  stats: string;

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

  @Column({ nullable: true })
  achievement_points: number;

  @Column({ nullable: true })
  mythic_rating: number;

  @Column({ nullable: true })
  mythic_rating_color: string;


}
