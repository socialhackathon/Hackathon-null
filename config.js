module.exports = {
  ROOT: __dirname,
  COOKIE_LIFE_TIME_IN_MILISECONDS: 19947483647,
  SESSION: {
      secret: 'myverystronsecretkey',
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379,
        ttl: process.env.REDIS_TTL || 260
      }
  },
  UPLOAD_PATH: __dirname + '/public'
}
