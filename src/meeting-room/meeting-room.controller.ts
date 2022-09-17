import { Controller, Get } from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';

@Controller('meeting-room')
export class MeetingRoomController {
  constructor(private readonly bookingRoomService: MeetingRoomService) {}

  @Get()
  findAll() {
    return this.bookingRoomService.findAll();
  }
}
