import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI is not set; skipping database connection.");
    return false;
  }

  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Database connection has already been established.");
    return true;
  } 

  if (connectionState === 2) {
    console.log("Establishing database connection...");
    return true;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "portfolio",
      bufferCommands: true,
    });
    console.log("Database connection established successfully.");
    return true;
  } catch (err: any) {
    console.log("Error: ", "Connection to database failed");
    console.error(err);
    return false;
  }
};

export default connectToDatabase;
 
