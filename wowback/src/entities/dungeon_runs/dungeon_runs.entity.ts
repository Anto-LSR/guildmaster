/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Affixe } from '../affixes/affixe.entity';
import { Character } from '../character/character.entity';

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
  rating: string;
  @ManyToMany(() => Character)
  members: Character[];
  @ManyToMany(() => Affixe, (affixe) => affixe.dungeon_runs)
  affixes: Affixe[];
  @Column({ nullable: true })
  best_run_player_count: number;
  @Column({ nullable: true })
  dungeon_name: string;
  @Column({ nullable: true })
  dungeon_id: string;
}
