export const {
    PORT = 3000,
    NODE_ENV = 'development',
    SESS_NAME = 'sid',
    SESS_SECRET = 'secretsessiontoken?!',
    SESS_LIFETIME = 1000 * 60 * 60 * 2
  } = process.env;