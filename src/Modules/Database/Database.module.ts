import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GradeModel } from './models/Grade.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      database: 'database.sqlite',
      models: [GradeModel],
    }),
  ],
})
export class DatabaseModule {}
