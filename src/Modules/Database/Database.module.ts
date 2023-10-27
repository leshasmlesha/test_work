import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GradeModel } from './models/Grade.model';
import { DatabaseMigrations } from './Database.migrations';
import { StudentModel } from './models/Student.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: 'database.sqlite',
      logging: false,
      models: [GradeModel, StudentModel],
    }),
  ],
  providers: [DatabaseMigrations],
})
export class DatabaseModule {}
