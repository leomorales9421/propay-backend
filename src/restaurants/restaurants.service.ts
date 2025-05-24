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

    findAll() {
        return `This action returns all restaurants`;
    }

    findOne(id: number) {
        return `This action returns a #${id} restaurant`;
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
        if (imageFilename) restaurant.image = imageFilename;

        return await this.restaurantRepository.save(restaurant);
    }

    remove(id: number) {
        return `This action removes a #${id} restaurant`;
    }
}
