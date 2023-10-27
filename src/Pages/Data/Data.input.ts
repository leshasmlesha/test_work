import { ApiProperty } from '@nestjs/swagger';

export class LogInput {
  @ApiProperty() page: number;
  @ApiProperty() page_size: number;
}
