import { userInfo } from 'os';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
    ManyToMany,
    JoinTable,
  } from 'typeorm';
import { Character } from '../character/character.entity';

  @Entity()
  export class Dungeon_run {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({nullable: true})
    completed_timestamp: string;
    @Column({nullable: true})
    duration: string;
    @Column({nullable: true})
    is_completed_within_time: boolean;
    @Column({nullable: true})
    keystone_level: number;
    @Column({nullable: true})
    color_rating: string;
    @Column({nullable: true})
    rating: string;
    @ManyToMany(() => Character)
    @JoinTable()
    members: Character[]
    /*@Column({nullable: true})
    affixess : Affixes[];*/
    @Column({nullable: true})
    dungeon_name:string;
    @Column({nullable: true})
    dungeon_id: string;

  }