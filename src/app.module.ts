import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import type { ConfigModuleOptions } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './config/configuration';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guards';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        ConfigModule.forRoot(<ConfigModuleOptions>{
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const db = configService.get('database');
                return {
                    type: 'mysql',
                    host: db?.host || 'localhost',
                    port: db?.port || 3306,
                    username: db?.username || 'root',
                    password: db?.password || '',
                    database: db?.name || 'test',
                    autoLoadEntities: true,
                    synchronize: true,
                };
            },
        }),
        UsersModule,
        AuthModule,
        RestaurantsModule,
        ProductsModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule { }
