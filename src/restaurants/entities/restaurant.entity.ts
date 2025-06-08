import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restaurants')
export class Restaurant {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 299 })
    name: string;

    @Column({ unique: true })
    slug: string;

    @Column({ length: 299 })
    address: string;

    @Column({ unique: true })
    phone: string;

    @Column({ length: 299 })
    state: string;

    @Column({ type: 'time' })
    hour_open: string;

    @Column({ type: 'time' })
    hour_close: string;

    @Column()
    image: string;
}
