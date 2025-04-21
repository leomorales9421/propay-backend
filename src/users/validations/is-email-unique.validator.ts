import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
    registerDecorator,
    ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users.service'; // o donde tengas el servicio

@Injectable()
@ValidatorConstraint({ async: true })
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly usersService: UsersService) { }

    async validate(email: string, args: ValidationArguments): Promise<boolean> {
        const user = await this.usersService.findByEmail(email);
        return !user;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Email already exists';
    }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailUniqueConstraint,
        });
    };
}
