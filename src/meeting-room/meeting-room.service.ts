import { Injectable } from '@nestjs/common';
import { MeetingRoom, MeetingRoomRepository } from './meeting-room.repository';

@Injectable()
export class MeetingRoomService {
  readonly #meetingRoomRepository: MeetingRoomRepository;

  constructor(meetingRoomRepo: MeetingRoomRepository) {
    this.#meetingRoomRepository = meetingRoomRepo;
  }

  async findAll(): Promise<MeetingRoom[]> {
    return await this.#meetingRoomRepository.getAll();
  }
}
