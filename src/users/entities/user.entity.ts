import { Role } from 'src/common/enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean;

  @Column()
  phone: string;

  @Column()
  country: string;

  @Column({ type: 'enum', enum: Role, default: Role.Customer })
  role: Role;
}
