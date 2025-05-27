
import { User } from '../entities/user.entity';

export class UserResponseDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    country: string;
    phone: string;

    constructor(user: User) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.country = user.country;
        this.phone = user.phone;
    }
}
