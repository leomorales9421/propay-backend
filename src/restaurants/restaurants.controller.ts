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
    findAll() {
        return ResponseDto.success(this.restaurantsService.findAll(), "Restaurantes encontrados correctamente");
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return ResponseDto.success(this.restaurantsService.findOne(id), "Restaurante encontrado correctamente");
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
                groups: ['update'],
            });

            const errors = await validate(updateRestaurantDto, {
                groups: ['update'],
                whitelist: true,
                forbidNonWhitelisted: true,
            });

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
