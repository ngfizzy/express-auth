import dotenv from 'dotenv';

dotenv.config();

export const environment = {
  nodeEnv: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: Number.parseInt(process.env.PORT || '3000', 10),
  saltRound: Number.parseInt(process.env.SALT_ROUND || '10', 10),
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'nodeexpressauthuser',
    password: process.env.DB_PASSWORD || 'nodeexpressauthpassword',
    database: process.env.DB_NAME || 'nodeexpressauth',
    externalPort: process.env.DB_PORT_EXTERNAL || '5444',
    externalHost: process.env.DB_EXTERNAL_HOST || 'localhost',
  },
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExp: process.env.JWT_EXPIRATION || '1H',
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID || '',
    authToken: process.env.TWILIO_AUTH_TOKEN || '',
    phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  },
  verificationCodeExpInMin: Number.parseInt(process.env.ACC_VERIFICATION_CODE_EXP_MIN || '10', 10),
};

export type TEnvironment = typeof environment;
