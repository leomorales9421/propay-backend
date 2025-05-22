import {
    IsDefined,
    IsNotEmpty,
    IsString,
    MaxLength,
    IsPhoneNumber,
} from 'class-validator';

export class CreateRestaurantDto {
    @IsDefined({ message: 'El nombre es obligatorio' })
    @IsNotEmpty({ message: 'El nombre no debe estar vacío' })
    @IsString({ message: 'El nombre debe ser texto' })
    @MaxLength(299, { message: 'El nombre no puede tener más de 299 caracteres' })
    name: string;

    @IsDefined({ message: 'La dirección es obligatoria' })
    @IsNotEmpty({ message: 'La dirección no debe estar vacía' })
    @IsString({ message: 'La dirección debe ser texto' })
    @MaxLength(299, { message: 'La dirección no puede tener más de 299 caracteres' })
    address: string;

    @IsDefined({ message: 'El número de teléfono es obligatorio' })
    @IsNotEmpty({ message: 'El número de teléfono no debe estar vacío' })
    @IsPhoneNumber('VE', { message: 'El número de teléfono debe ser válido para Venezuela (ej: +58...)' })
    phone: string;

    @IsDefined({ message: 'El estado es obligatorio' })
    @IsNotEmpty({ message: 'El estado no debe estar vacío' })
    @IsString({ message: 'El estado debe ser texto' })
    @MaxLength(299, { message: 'El estado no puede tener más de 299 caracteres' })
    state: string;
}
