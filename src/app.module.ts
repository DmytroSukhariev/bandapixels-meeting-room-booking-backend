import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeetingRoomModule } from './meeting-room/meeting-room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/entities/booking.entity';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: Number(config.get('POSTGRES_PORT')),
        username: config.get('POSTGRES_USER'),
        database: config.get('POSTGRES_DB'),
        password: config.get('POSTGRES_PASSWORD'),
        synchronize: true,
        logging: true,
        entities: [Booking],
      }),
    }),
    MeetingRoomModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
