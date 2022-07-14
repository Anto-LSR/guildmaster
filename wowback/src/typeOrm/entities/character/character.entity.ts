import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Character {
    @PrimaryGeneratedColumn()
    @OneToOne(() => User)
    id: number;
    @Column()
    name: string;
    @Column()
    level: number;
    @Column()
    class: string;
    @Column()
    realm : string;
    @Column()
    faction: string;

    @ManyToOne(() => User, (user) => user.characters)
    user: User;
}