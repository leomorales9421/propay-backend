import {
    IsDefined,
    IsNotEmpty,
    IsString,
    MaxLength,
    IsPhoneNumber,
    Matches,
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
    @IsDefined({ message: 'El campo "hour_open" es obligatorio' })
    @IsNotEmpty({ message: 'La hora de apertura no debe estar vacía' })
    @IsString({ message: 'La hora de apertura debe ser texto' })
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'El campo "hour_open" debe tener el formato HH:mm:ss (ej: 14:00:00)' })
    hour_open: string;

    @IsDefined({ message: 'El campo "hour_close" es obligatorio' })
    @IsNotEmpty({ message: 'La hora de cierre no debe estar vacía' })
    @IsString({ message: 'La hora de cierre debe ser texto' })
    @Matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, { message: 'El campo "hour_close" debe tener el formato HH:mm:ss (ej: 14:00:00)' })
    hour_close: string;
}
