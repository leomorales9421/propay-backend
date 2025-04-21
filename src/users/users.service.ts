import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);
    return new UserResponseDto(user);
  }

  findAll() {
    // ...existing code...
  }

  findOne(id: number) {
    // ...existing code...
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // ...existing code...
  }

  remove(id: number) {
    // ...existing code...
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ email });
  }
}
