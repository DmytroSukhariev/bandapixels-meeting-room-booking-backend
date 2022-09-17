import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BookingService } from './booking.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  readonly #bookingService: BookingService;

  constructor(bookingService: BookingService) {
    this.#bookingService = bookingService;
  }

  @Get('for-room/:roomId')
  async forRoom(
    @Param('roomId') roomId: string,
    @Query('from') fromDateString: string,
    @Query('to') toDateString: string,
  ): Promise<Booking[]> {
    return this.#bookingService.getForRoom(
      Number(roomId),
      new Date(fromDateString),
      new Date(toDateString),
    );
  }

  @Post()
  createForRoom(@Body() data: CreateBookingDto): Promise<Booking> {
    return this.#bookingService.createForRoom(data);
  }
}
