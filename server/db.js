import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const MONGO_URI = process.env.MONGO_URI

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Unable to connect to MongoDB')
  }
}

export default connectToDB
