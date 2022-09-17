import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBookingDto {
  @IsString()
  issuerFirstName: string;

  @IsString()
  issuerLastName: string;

  @IsNumber()
  meetingRoomId: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString()
  start: string;

  @IsDateString()
  end: string;
}
