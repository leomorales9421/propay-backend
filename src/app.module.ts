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

@Module({
  imports: [
    ConfigModule.forRoot(<ConfigModuleOptions>{
      isGlobal: true, // Disponible en todo el proyecto sin volver a importar
      load: [configuration], // archivo de config que agrupa las variables
    }),
    // Conexión a MySQL
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // necesitamos acceso a las variables del .env
      inject: [ConfigService], // inyectamos ConfigService para leerlas
      useFactory: (configService: ConfigService) => {
        const db = configService.get('database'); // Asegúrate de que 'database' esté correctamente definido
        return {
          type: 'mysql',
          host: db?.host || 'localhost', // Valores predeterminados en caso de que falten
          port: db?.port || 3306,
          username: db?.username || 'root',
          password: db?.password || '',
          database: db?.name || 'test',
          autoLoadEntities: true, // carga automática de entidades
          synchronize: true, // solo para desarrollo (crea tablas automáticamente)
        };
      },
    }),
    UsersModule,
    AuthModule,
    RestaurantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
