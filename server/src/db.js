/* eslint-disable no-console */
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const { MONGO_URI } = process.env

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    mongoose.set('toJSON', {
      virtuals: true,
      transform: (doc, converted) => {
        // eslint-disable-next-line no-param-reassign
        delete converted._id
      },
    })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(`Unable to connect to MongoDB (${error.message}) `)
  }
}

export default connectToDB
