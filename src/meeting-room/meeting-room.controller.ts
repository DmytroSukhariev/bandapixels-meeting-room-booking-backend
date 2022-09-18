import { Controller, Get, Param, Query } from '@nestjs/common';
import { MeetingRoomService } from './meeting-room.service';
import { MeetingRoom } from './meeting-room.repository';

@Controller('meeting-room')
export class MeetingRoomController {
  constructor(private readonly meetingRoomService: MeetingRoomService) {}

  @Get()
  findAll(): Promise<MeetingRoom[]> {
    return this.meetingRoomService.findAll();
  }

  @Get('/available-rooms')
  availableRooms(
    @Query('numberOfPeople') numberOfPeople: string = '1',
    @Query('from') fromDateString: string,
    @Query('to') toDateString: string,
  ) {
    return this.meetingRoomService.getAvailableRooms(
      Number(numberOfPeople),
      new Date(fromDateString),
      new Date(toDateString),
    );
  }

  @Get('/:id')
  getById(@Param('id') id: number): Promise<MeetingRoom> {
    return this.meetingRoomService.getById(Number(id));
  }
}
