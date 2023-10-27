import { CreationOptional, Model } from 'sequelize';
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'students' })
export class StudentModel extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: CreationOptional<number>;
  @AllowNull(false)
  @Column(DataType.STRING)
  personalCode: string;
  @Column(DataType.STRING)
  name: string;
  @Column(DataType.STRING)
  lastName: string;
}
