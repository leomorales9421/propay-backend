import {
    IsNotEmpty,
    IsString,
    MaxLength,
    IsPhoneNumber,
} from 'class-validator';

export class CreateRestaurantDto {

    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser texto' })
    @MaxLength(299, { message: 'El nombre no puede tener más de 299 caracteres' })
    name: string;

    @IsNotEmpty({ message: 'La dirección es obligatoria' })
    @IsString({ message: 'La dirección debe ser texto' })
    @MaxLength(299, { message: 'La dirección no puede tener más de 299 caracteres' })
    address: string;

    @IsNotEmpty({ message: 'El número de teléfono es obligatorio' })
    @IsPhoneNumber('VE', { message: 'El número de teléfono debe ser válido para Venezuela (ej: +58...)' })
    phone: string;

    @IsNotEmpty({ message: 'El estado es obligatorio' })
    @IsString({ message: 'El estado debe ser texto' })
    @MaxLength(299, { message: 'El estado no puede tener más de 299 caracteres' })
    state: string;
}
