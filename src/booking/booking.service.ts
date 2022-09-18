import { ConflictException, Injectable } from '@nestjs/common';
import { Booking } from './entities/booking.entity';
import {
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
  DataSource,
} from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';

const getEngagedRoomIdsQuery = `
with timestamps as (
    select $1::timestamp _start,
           $2::timestamp _end
    ),
    engaged_meeting_rooms as (
        select b."meeting-room-id" engaged_id
        from booking b,
            timestamps ts
        where
            (b.start <= ts._start and
             b.end >= ts._start) or
            (b.start >= ts._start and
             b.end <= ts._end) or
            (b.start <= ts._start and
             b.end >= ts._end) or
            (b.start <= ts._end and
             b.end >= ts._end)
        group by b."meeting-room-id"
    )
select * from engaged_meeting_rooms;
`;

@Injectable()
export class BookingService {
  readonly #bookingRepo: Repository<Booking>;
  readonly #dataSource: DataSource;

  constructor(
    @InjectRepository(Booking) bookingRepo: Repository<Booking>,
    dataSource: DataSource,
  ) {
    this.#bookingRepo = bookingRepo;
    this.#dataSource = dataSource;
  }

  getForRoom(roomId: number, fromDate: Date, toDate: Date): Promise<Booking[]> {
    return this.#bookingRepo.find({
      where: [
        { start: LessThan(fromDate), end: MoreThan(fromDate) }, // starts before time span but ends on the timespan
        { start: MoreThanOrEqual(fromDate), end: LessThanOrEqual(toDate) }, // starts and ends in the timespan
        { start: LessThan(toDate), end: MoreThan(toDate) }, // starts in the timespan and ends after it ends
      ].map((dateCond) => ({ meetingRoomId: roomId, ...dateCond })),
    });
  }

  async createForRoom(data: CreateBookingDto): Promise<Booking> {
    if (!(await this.#checkAbilityToCreate(data)))
      throw new ConflictException('There are bookings intersects with yours');
    return this.#bookingRepo.save(data);
  }

  async getEngagedRoomsIds(from: Date, to: Date): Promise<number[]> {
    return this.#dataSource
      .createEntityManager()
      .query(getEngagedRoomIdsQuery, [from, to])
      .then((result) => result.map(({ engaged_id }) => engaged_id));
  }

  async #checkAbilityToCreate(data: CreateBookingDto): Promise<boolean> {
    const { meetingRoomId, start, end } = data;

    const startDate = new Date(start);
    const endDate = new Date(end);

    return await this.#bookingRepo
      .count({
        where: [
          { start: LessThan(startDate), end: MoreThan(startDate) }, // starts before time span but ends on the timespan
          { start: MoreThanOrEqual(startDate), end: LessThanOrEqual(endDate) }, // starts and ends in the timespan
          { start: LessThanOrEqual(startDate), end: MoreThanOrEqual(endDate) }, // starts before start and ends after end
          { start: LessThan(endDate), end: MoreThan(endDate) }, // starts in the timespan and ends after it ends
        ].map((dateCond) => ({ meetingRoomId, ...dateCond })),
      })
      .then((count) => count === 0);
  }
}
