import { POSTGRES } from './src/config/constants'

export default {
  type: 'postgres',
  host: POSTGRES.HOST,
  port: POSTGRES.PORT,
  username: POSTGRES.USERNAME,
  password: POSTGRES.PASSWORD,
  database: POSTGRES.DATABASE,
  entities: ['./src/models/*.ts'],
  migrations: ['./src/migrations/*.ts'],
  synchronize: true, //! useful in dev, remove in prod
  cli: {
    entitiesDir: './src/models',
    migrationsDir: './src/migrations',
  },
}
