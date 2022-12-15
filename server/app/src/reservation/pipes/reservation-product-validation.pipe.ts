import { PipeTransform } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { GetKeyValidationPipe } from 'src/common/get-key-validation.pipe';
import { DataSource } from 'typeorm';
import { ReservationProducts } from '../entities/reservation.entity';

export class ReservationProductValidationPipe implements PipeTransform {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async transform(hashId: string): Promise<ReservationProducts> {
    return await new GetKeyValidationPipe(this.dataSource).target({
      entity: new ReservationProducts(),
      value: hashId,
    });
  }
}
