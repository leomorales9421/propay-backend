import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
} from 'class-validator';

export function Match(property: string, validationOptions?: ValidationOptions) {
    return (object: any, propertyName: string) => {
        registerDecorator({
            name: 'Match',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    return value === (args.object as any)[relatedPropertyName];
                },
            },
        });
    };
}
