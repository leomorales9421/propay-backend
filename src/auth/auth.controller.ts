import { Body, Controller, Headers, HttpCode, HttpException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseDto } from 'src/common/dto/response.dto';
import { UnauthorizedException } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto): Promise<ResponseDto<any>> {
        const result = await this.authService.login(loginDto.email, loginDto.password);
        return ResponseDto.success(result, 'Inicio de sesión exitoso');
    }

    @Post('refresh')
    @HttpCode(200)
    async refresh(@Headers('authorization') authHeader: string): Promise<ResponseDto<any>> {
        const refreshToken = authHeader?.split(' ')[1];

        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token no proporcionado');
        }

        const result = await this.authService.refreshToken(refreshToken);
        return ResponseDto.success(result, 'Token renovado exitosamente');

    }
}
