import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../validations/match.decorator';
import { IsEmailUnique } from '../validations/is-email-unique.validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'El email no es válido' })
  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  @IsEmailUnique({ message: 'El email ya esta en uso' })
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password: string;


  @IsString()
  @IsNotEmpty({ message: 'El pais es requerido' })
  country: string;

  @IsString()
  @IsNotEmpty({ message: 'El teléfono es requerido' })
  @MinLength(11, { message: 'El Teléfono debe tener al menos 11 caracteres' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'Repetir Contraseña es requerido' })
  @Match('password', { message: 'Las Contraseñas no Coinciden' })
  repeatPassword: string;
}
