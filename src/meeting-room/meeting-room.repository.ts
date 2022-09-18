import { Injectable } from '@nestjs/common';
import { OfficeBuilding } from '../common/office-building.enum';

export type MeetingRoom = {
  id: number;
  peopleCapacity: number;
  building: OfficeBuilding;
  officeMeetingRoomId: number;
};

@Injectable()
export class MeetingRoomRepository {
  readonly #roomsMap: Map<MeetingRoom['id'], MeetingRoom>;
  readonly #rooms: MeetingRoom[] = [
    {
      id: 1,
      peopleCapacity: 4,
      building: OfficeBuilding.OFFICE_1,
      officeMeetingRoomId: 1,
    },
    {
      id: 2,
      peopleCapacity: 5,
      building: OfficeBuilding.OFFICE_1,
      officeMeetingRoomId: 2,
    },
    {
      id: 3,
      peopleCapacity: 2,
      building: OfficeBuilding.OFFICE_2,
      officeMeetingRoomId: 1,
    },
    {
      id: 4,
      peopleCapacity: 4,
      building: OfficeBuilding.OFFICE_2,
      officeMeetingRoomId: 2,
    },
    {
      id: 5,
      peopleCapacity: 1,
      building: OfficeBuilding.OFFICE_2,
      officeMeetingRoomId: 3,
    },
  ];

  constructor() {
    this.#roomsMap = new Map();
    this.#mapById();
  }

  #mapById(): void {
    this.#rooms.forEach((room) => {
      this.#roomsMap.set(room.id, room);
    });
  }

  async getById(id: number): Promise<MeetingRoom | undefined> {
    return this.#roomsMap.get(id);
  }

  async getAll(): Promise<MeetingRoom[]> {
    return this.#rooms;
  }
}
