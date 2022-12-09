/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dungeon_run } from '../dungeon_runs/dungeon_runs.entity';

@Entity()
export class Affixe {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  name: string;
  @Column({ nullable: true })
  media: string;
  @Column({ nullable: true })
  blizzard_id: number;
  @ManyToMany(() => Dungeon_run, (dungeon_run) => dungeon_run.affixes)
  dungeon_runs: Dungeon_run[];
}
