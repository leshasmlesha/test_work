import { InjectConnection } from '@nestjs/sequelize';
import { SequelizeStorage, Umzug } from 'umzug';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { join, relative } from 'path';
import { Sequelize } from 'sequelize-typescript';
const path = relative('', join(__dirname, 'migrations/*.js')).replaceAll(
  '\\',
  '/',
);
class LoggerSequelize extends Logger {
  info(message: any, context?: string) {
    if (message) return this.log(message, context);
  }
}
@Injectable()
export class DatabaseMigrations implements OnModuleInit {
  private readonly logger = new LoggerSequelize(DatabaseMigrations.name);
  constructor(@InjectConnection() private sequelize: Sequelize) {}
  async migrate() {
    const umzug = new Umzug({
      migrations: { glob: path },
      context: this.sequelize.getQueryInterface(),
      logger: this.logger,
      storage: new SequelizeStorage({ sequelize: this.sequelize }),
    });
    await umzug.up();
  }
  async onModuleInit() {
    return this.migrate();
  }
}
