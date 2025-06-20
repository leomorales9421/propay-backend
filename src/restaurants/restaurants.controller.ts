import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Express } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ResponseDto } from 'src/common/dto/response.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
@Roles(Role.Admin, Role.Customer)
@UseGuards(JwtAuthGuard)
@Controller('restaurants')
export class RestaurantsController {
    constructor(private readonly restaurantsService: RestaurantsService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/restaurants',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.startsWith('image/')) {
                    return cb(new BadRequestException('Solo se permiten imágenes'), false);
                }
                cb(null, true);
            },
        }),
    )
    async create(@Body() createRestaurantDto: CreateRestaurantDto, @UploadedFile() image: Express.Multer.File,) {

        try {
            if (!image) {
                throw new BadRequestException('La imagen es requerida');
            }
            const restaurant = await this.restaurantsService.create(createRestaurantDto, image.filename);
            return ResponseDto.success(restaurant, "Restaurante creado correctamente");
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            return ResponseDto.error(error.message, null, 500);
        }
    }

    @Get()
    async findAll() {
        const restaurants = await this.restaurantsService.findAll();
        return ResponseDto.success(restaurants, "Restaurantes encontrados correctamente");
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const restaurant = await this.restaurantsService.findOne(id);
        return ResponseDto.success(restaurant, "Restaurante encontrado correctamente");
    }

    @Patch(':id')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/restaurants',
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.mimetype.startsWith('image/')) {
                    return cb(new BadRequestException('Solo se permiten imágenes'), false);
                }
                cb(null, true);
            },
        }),
    )

    async update(
        @Param('id') id: string,
        @Body() body: any,
        @UploadedFile() image: Express.Multer.File,
    ) {
        try {
            const updateRestaurantDto = plainToInstance(UpdateRestaurantDto, body, {
                enableImplicitConversion: true,
            });

            const errors = await validate(updateRestaurantDto, {
                whitelist: true,
                forbidNonWhitelisted: true,
            });

            if (errors.length > 0) {
                const messages = errors
                    .map(error => Object.values(error.constraints || {}))
                    .flat();

                throw new BadRequestException(messages);
            }

            const updatedRestaurant = await this.restaurantsService.update(id, updateRestaurantDto, image?.filename);
            return ResponseDto.success(updatedRestaurant, "Restaurante actualizado correctamente");
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw error;
            }
            return ResponseDto.error(error.message, null, 500);
        }
    }


    @Delete(':id')
    remove(@Param('id') id: string) {
        this.restaurantsService.remove(id);

        return ResponseDto.success([], "Restaurante eliminado correctamente");
    }
}
