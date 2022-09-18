import { Injectable, NotFoundException } from '@nestjs/common';
import { MeetingRoom, MeetingRoomRepository } from './meeting-room.repository';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class MeetingRoomService {
  readonly #meetingRoomRepository: MeetingRoomRepository;
  readonly #bookingService: BookingService;

  constructor(
    meetingRoomRepo: MeetingRoomRepository,
    bookingService: BookingService,
  ) {
    this.#meetingRoomRepository = meetingRoomRepo;
    this.#bookingService = bookingService;
  }

  async findAll(): Promise<MeetingRoom[]> {
    return await this.#meetingRoomRepository.getAll();
  }

  async getById(id: number): Promise<MeetingRoom> {
    const room = await this.#meetingRoomRepository.getById(id);
    if (!room) throw new NotFoundException('Meeting room not found!');
    return room;
  }

  async getAvailableRooms(
    numberOfPeople: number,
    from: Date,
    to: Date,
  ): Promise<any> {
    const rooms = await this.#meetingRoomRepository.getAll();
    const engagedRoomIds = new Set(
      await this.#bookingService.getEngagedRoomsIds(from, to),
    );

    return rooms
      .filter(({ id }) => !engagedRoomIds.has(id))
      .filter(({ peopleCapacity }) => peopleCapacity >= numberOfPeople);
  }
}
