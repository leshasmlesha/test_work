import { registerAs } from '@nestjs/config';
import { existsSync, readFileSync } from 'fs';
import Joi from 'joi';
import { join } from 'path';
const path = join(__dirname, 'nats.json');
export class ConfigNats {
  server: string;
}
const validator = Joi.object<ConfigNats, true>({
  server: Joi.string().required(),
});
export default registerAs('nats', (): ConfigNats => {
  const validated = validator.validate(
    existsSync(path) ? JSON.parse(readFileSync(path, 'utf-8')) : {},
  );
  if (validated.error) throw validated.error;
  return validated.value;
});
