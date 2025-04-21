import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { IsEmailUniqueConstraint } from './validations/is-email-unique.validator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, IsEmailUniqueConstraint],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule { }
