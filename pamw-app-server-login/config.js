export const {
    PORT = 3000,
    NODE_ENV = 'development',
    SESS_NAME = 'PAMWSESSION',
    SESS_SECRET = 'secretsessiontoken?!',
    SESS_LIFETIME = 1000 * 60 * 60 * 1,
    ACCESS_TOKEN_SECRET = 'secretjwttoken1234',
    REFRESH_TOKEN_SECRET = 'refsecretjwttoken4321'
  } = process.env;