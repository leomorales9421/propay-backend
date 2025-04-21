import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: "El email es requerido" })
    @IsEmail({}, { message: "Email no valido" })
    email: string;

    @IsNotEmpty({ message: "La contraseña es requerida" })
    @IsString()
    password: string;
}
