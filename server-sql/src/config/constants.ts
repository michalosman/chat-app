import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 5000
export const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000'
export const SECRET_KEY = process.env.SECRET_KEY as string
export const POSTGRES = {
  HOST: process.env.PG_HOST,
  PORT: parseInt(process.env.PG_PORT || '5432'),
  USERNAME: process.env.PG_USERNAME,
  PASSWORD: process.env.PG_PASSWORD,
  DATABASE: process.env.PG_DATABASE,
}
