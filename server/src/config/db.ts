import { createConnection } from 'typeorm'

export const connectToDB = async () => {
  try {
    await createConnection()
    console.log('Connected to PostgreSQL')
  } catch (error) {
    console.log(`Unable to connect to PostgreSQL (${error.message}) `)
  }
}
