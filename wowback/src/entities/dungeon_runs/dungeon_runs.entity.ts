/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Affixe } from '../affixes/affixe.entity';
import { Character } from '../character/character.entity';
import { Dungeon } from '../dungeons/dungeon.entity';

@Entity()
export class Dungeon_run {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  completed_timestamp: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ nullable: true })
  is_completed_within_time: boolean;

  @Column({ nullable: true })
  keystone_level: number;

  @Column({ nullable: true })
  color_rating: string;

  @Column({ nullable: true })
  rating: number;

  @ManyToMany(() => Affixe, (affixe) => affixe.dungeon_runs)
  affixes: Affixe[];

  @ManyToOne(() => Dungeon, (dungeon) => dungeon.dungeon_runs)
  dungeon: Dungeon

  @Column({ nullable: true })
  dungeon_name: string;

  @Column({ nullable: true })
  dungeon_id: number;

  @ManyToMany(() => Character)
  @JoinTable()
  characters: Character[];
}
