import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class RestaurantsService {
    constructor(
        @InjectRepository(Restaurant)
        private readonly restaurantRepository: Repository<Restaurant>,
    ) { }
    async create(dto: CreateRestaurantDto, imageFilename: string) {
        const restaurant = this.restaurantRepository.create({
            ...dto,
            slug: slugify(dto.name, { lower: true }),
            image: imageFilename,
        });
        return await this.restaurantRepository.save(restaurant);
    }

    async findAll() {
        const restaurants = await this.restaurantRepository.find();
        if (!restaurants || restaurants.length === 0) {
            throw new NotFoundException('No se encontraron restaurantes');
        }
        return restaurants;
    }

    async findOne(id: string) {
        const restaurant = await this.restaurantRepository.findOne({ where: { id } });

        if (!restaurant) {
            throw new NotFoundException('Restaurante no encontrado');
        }

        return restaurant;
    }

    async update(id: string, dto: UpdateRestaurantDto, imageFilename?: string) {
        const restaurant = await this.restaurantRepository.findOne({ where: { id } });

        if (!restaurant) {
            throw new NotFoundException('Restaurante no encontrado');
        }

        if (dto.name !== undefined) {
            restaurant.name = dto.name;
            restaurant.slug = slugify(dto.name, { lower: true });
        }

        if (imageFilename && restaurant.image) {
            const imagePath = path.join(__dirname, '..', '..', 'uploads', 'restaurants', restaurant.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        if (dto.address !== undefined) restaurant.address = dto.address;
        if (dto.phone !== undefined) restaurant.phone = dto.phone;
        if (dto.state !== undefined) restaurant.state = dto.state;
        if (dto.hour_open !== undefined) restaurant.hour_open = dto.hour_open;
        if (dto.hour_close !== undefined) restaurant.hour_close = dto.hour_close;
        if (imageFilename) restaurant.image = imageFilename;

        return await this.restaurantRepository.save(restaurant);
    }

    async remove(id: string) {
        const restaurant = await this.restaurantRepository.findOne({ where: { id } });

        if (!restaurant) {
            throw new NotFoundException('Restaurante no encontrado');
        }

        return this.restaurantRepository.remove(restaurant);
    }
}
