import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    if (error instanceof mongoose.Error) {
      console.error(`Mongoose Error: ${error.message}`)
    } else if (error instanceof Error) {
      console.error(`General Error: ${error.message}`)
    } else {
      console.error('Unknown error occurred')
    }
    process.exit(1) // Exit process with failure
  }
}
export default connectDB
