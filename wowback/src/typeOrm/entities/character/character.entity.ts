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
  @Column({nullable : true})
  name: string;
  @Column({nullable : true})
  level: number;
  @Column({nullable : true})
  class: string;
  @Column({nullable : true})
  realm: string;
  @Column({nullable : true})
  faction: string;
  @Column({nullable : true})
  wowCharacterId: string;
  @Column({nullable : true})
  race: string;
  @Column({nullable : true})
  gender: string;
  @ManyToOne(() => User, (user) => user.characters)
  user: User;

  @Column({nullable : true})
  avatarUrl : string;

  @Column({nullable : true})
  mainPictureUrl : string;
}
