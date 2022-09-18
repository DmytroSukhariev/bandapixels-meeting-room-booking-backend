import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getById(id: number): Promise<MeetingRoom> {
    const room = await this.#meetingRoomRepository.getById(id);
    if (!room) throw new NotFoundException('Meeting room not found!');
    return room;
  }
}
