import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseDto } from '../common/dto/response.dto'; // Asegúrate de importar el ResponseDto
import path from 'path';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<ResponseDto<any>> {
        try {
            const user = await this.usersService.create(createUserDto);

            return ResponseDto.success(user, 'Usuario creado con éxito');
        } catch (error) {
            return ResponseDto.error(error.message || 'Hubo un error al crear el usuario');
        }
    }

    @Post('login')
    login() {
        return true;
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id);
    }
}
