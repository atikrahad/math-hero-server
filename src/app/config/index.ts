import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URI,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS),
  default_password: process.env.DEFAULT_PASSWORD,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  mail_host: process.env.MAIL_HOST,
  mail_port: process.env.MAIL_PORT,
  mail_username: process.env.MAIL_USER,
  mail_password: process.env.MAIL_PASS,
};