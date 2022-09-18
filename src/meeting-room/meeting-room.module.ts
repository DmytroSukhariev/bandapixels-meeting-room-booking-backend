import { Module } from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { MeetingRoomController } from './meeting-room.controller';
import { MeetingRoomRepository } from './meeting-room.repository';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [BookingModule],
  controllers: [MeetingRoomController],
  providers: [MeetingRoomService, MeetingRoomRepository],
})
export class MeetingRoomModule {}
