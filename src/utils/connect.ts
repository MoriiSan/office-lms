import mongoose from 'mongoose';

/* multiple database connection, passing the desired dbName as a string */
export const connectDB = async (dbName: string) => {
  if (mongoose.connections[0].readyState) {
    // Use existing database connection if it's already established
    return mongoose.connection.useDb(dbName);
  }

  try {
    // Create a new connection to the specified database
    await mongoose.connect(`${process.env.MONGO_URI!}${dbName}`)
    console.log(`Connected to ${dbName} database`);

    return mongoose.connection.useDb(dbName);
  } catch (error) {
    console.log("Failed to connect to the ELEMES:", error);
  }
};


// export const connectDB = async () => {
//   try {
//     if (mongoose.connection.readyState === 0) {
//       await mongoose.connect(process.env.MONGO_URI!);
//       console.log('Connected to ELEMES-DB.');
//     }
//   } catch (error) {
//     console.log('Error connecting to ELEMES-DB: ', error);
//   }
// };

