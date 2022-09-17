import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeetingRoomModule } from './meeting-room/meeting-room.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //
    // })
    MeetingRoomModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
