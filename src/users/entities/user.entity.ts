import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string; // UUID como string

  @Column({ unique: true })
  email: string; // Correo electrónico

  @Column()
  firstName: string; // Primer nombre

  @Column()
  lastName: string; // Apellido

  @Column()
  password: string; // Contraseña

  @Column({ default: false }) // Por defecto, 'verified' será false
  verified: boolean; // Campo de verificación

  @Column()
  phone: string; // Teléfono

  @Column()
  country: string; // País
}
