import { Controller, Get, Param, Query } from '@nestjs/common';
import { GradeModel } from '../../Modules/Database/models/Grade.model';
import { StudentModel } from '../../Modules/Database/models/Student.model';
import { LogInput } from './Data.input';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
@Controller()
export class DataController {
  constructor(
    @InjectModel(GradeModel) private readonly grade: typeof GradeModel,
    @InjectModel(StudentModel) private readonly student: typeof StudentModel,
  ) {}
  @Get('log')
  async getLog(@Query() data: LogInput) {
    const result = await this.grade.findAll({
      attributes: ['grade', 'subject', ['createdAt', 'date']],
      order: ['createdAt'],
      include: [
        {
          model: this.student,
          attributes: ['personalCode', 'name', 'lastName'],
        },
      ],
      limit: data.page_size,
      offset: data.page - 1 * data.page_size,
    });
    return result;
  }

  @Get('statistic/:personalCode')
  async getGrade(@Param('personalCode') personalCode: string) {
    const result = await this.student.findOne({
      where: { personalCode },
      attributes: ['personalCode', 'name', 'lastName'],
      raw: true,
    });
    return {
      ...result,
      statistic: await this.grade.findAll({
        where: { personalCode },
        attributes: [
          'subject',
          [Sequelize.fn('min', Sequelize.col('grade')), 'minGrade'],
          [Sequelize.fn('max', Sequelize.col('grade')), 'maxGrade'],
          [Sequelize.fn('avg', Sequelize.col('grade')), 'avgGrade'],
          [Sequelize.fn('count', Sequelize.col('grade')), 'totalGrades'],
        ],
        group: ['subject'],
      }),
    } as StudentModel;
  }
}
