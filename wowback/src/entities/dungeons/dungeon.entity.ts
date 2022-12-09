import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
