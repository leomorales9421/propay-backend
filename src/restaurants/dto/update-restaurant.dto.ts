
import {
    IsDefined,
    IsNotEmpty,
    IsString,
    MaxLength,
    IsPhoneNumber,
    IsOptional,
} from 'class-validator';

export class UpdateRestaurantDto {

    @IsOptional({ groups: ['update'] })
    @IsString({ message: 'El nombre debe ser texto', groups: ['update'] })
    @MaxLength(299, { message: 'El nombre no puede tener más de 299 caracteres', groups: ['update'] })
    name?: string;

    @IsOptional({ groups: ['update'] })
    @IsString({ message: 'La dirección debe ser texto', groups: ['update'] })
    @MaxLength(299, { message: 'La dirección no puede tener más de 299 caracteres', groups: ['update'] })
    address?: string;

    @IsOptional({ groups: ['update'] })
    @IsPhoneNumber('VE', { message: 'El número de teléfono debe ser válido', groups: ['update'] })
    phone?: string;

    @IsOptional({ groups: ['update'] })
    @IsString({ message: 'El estado debe ser texto', groups: ['update'] })
    @MaxLength(299, { message: 'El estado no puede tener más de 299 caracteres', groups: ['update'] })
    state?: string;
}

