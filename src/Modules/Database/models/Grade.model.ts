import { CreationOptional } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
@Table({ tableName: 'grades' })
export class GradeModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
  @AllowNull(false)
  @Column(DataType.STRING)
  personalCode: string;
  @AllowNull(false)
  @Column(DataType.INTEGER)
  grade: number;
  @AllowNull(false)
  @Column(DataType.STRING)
  subject: string;
}
