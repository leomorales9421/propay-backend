
import {
    IsDefined,
    IsNotEmpty,
    IsString,
    MaxLength,
    IsPhoneNumber,
    IsOptional,
    Matches,
} from 'class-validator';

export class UpdateRestaurantDto {

    @IsOptional()
    @IsString({ message: 'El nombre debe ser texto', })
    @MaxLength(299, { message: 'El nombre no puede tener más de 299 caracteres', })
    name?: string;

    @IsOptional()
    @IsString({ message: 'La dirección debe ser texto', })
    @MaxLength(299, { message: 'La dirección no puede tener más de 299 caracteres', })
    address?: string;

    @IsOptional()
    @IsPhoneNumber('VE', { message: 'El número de teléfono debe ser válido', })
    phone?: string;

    @IsOptional()
    @IsString({ message: 'El estado debe ser texto', })
    @MaxLength(299, { message: 'El estado no puede tener más de 299 caracteres', })
    state?: string;

    @IsOptional()
    @IsString({ message: 'El campo "hour_open" debe ser texto', })
    @MaxLength(8, { message: 'El campo "hour_open" debe tener el formato HH:mm:ss', })
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'El campo "hour_open" debe tener el formato HH:mm:ss (ej: 14:00:00)' })
    hour_open?: string;

    @IsOptional()
    @IsString({ message: 'El campo "hour_close" debe ser texto', })
    @MaxLength(8, { message: 'El campo "hour_close" debe tener el formato HH:mm:ss', })
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'El campo "hour_close" debe tener el formato HH:mm:ss (ej: 14:00:00)' })
    hour_close?: string;
}

