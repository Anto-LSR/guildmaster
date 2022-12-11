import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dungeon_run } from '../dungeon_runs/dungeon_runs.entity';

@Entity()
export class Dungeon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  media: string;

  @Column({ nullable: true })
  blizzard_id: number;

  @OneToMany(() => Dungeon_run, (dungeon_run) => dungeon_run.dungeon)
  dungeon_runs : Dungeon_run [];

  //dungeon run n'a qu'un seul dungeon
  //dungeon a plusieur dungeon runs
  //photo = dungeon
  //user = dungeon_run
}
