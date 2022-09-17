import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base-entity';

@Entity({ name: 'booking' })
export class Booking extends BaseEntity {
  @Column({ name: 'issuer-first-name', type: 'varchar', length: 50 })
  issuerFirstName: string;

  @Column({ name: 'issuer-last-name', type: 'varchar', length: 50 })
  issuerLastName: string;

  @Column({ name: 'meeting-room-id', type: 'int4' })
  meetingRoomId: number;

  @Column({ name: 'description', type: 'varchar', length: 500, nullable: true })
  description: string;

  @Column({ name: 'start', type: 'timestamp' })
  start: Date;

  @Column({ name: 'end', type: 'timestamp' })
  end: Date;
}
