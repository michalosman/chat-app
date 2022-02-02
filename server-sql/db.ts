import { createConnection } from 'typeorm'

const connectToDB = async () => {
  try {
    await createConnection()
    console.log('Connected to PostgreSQL')
  } catch (error) {
    console.log(`Unable to connect to PostgreSQL (${error.message}) `)
  }
}

export default connectToDB
