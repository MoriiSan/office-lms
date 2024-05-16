import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI!);
      console.log('Connected to ELEMES-DB.');
    }
  } catch (error) {
    console.log('Error connecting to ELEMES-DB: ', error);
  }
};
