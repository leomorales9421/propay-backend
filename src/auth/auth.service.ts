import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('Credenciales Invalidas');

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) throw new UnauthorizedException('Credenciales Invalidas');

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);

        const payload = { sub: user.id, email: user.email };

        const accessToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '15m',
        });

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }


    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.JWT_REFRESH_SECRET,
            });

            const user = await this.usersService.findByEmail(payload.email);

            if (!user) throw new UnauthorizedException('Usuario no encontrado');

            const newAccessToken = this.jwtService.sign(
                { sub: user.id, email: user.email },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '15m',
                },
            );

            return {
                accessToken: newAccessToken,
            };
        } catch (err) {
            throw new UnauthorizedException('Refresh token inválido o expirado');
        }
    }


}
