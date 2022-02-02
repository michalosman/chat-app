import dotenv from 'dotenv'
dotenv.config()

module.exports = {
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || '5432'),
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  entities: ['models/*.ts'],
  migrations: ['migrations/*.ts'],
  // synchronize: true, //! use in dev, remove in prod
  cli: {
    entitiesDir: 'models',
    migrationsDir: 'migrations',
  },
}
