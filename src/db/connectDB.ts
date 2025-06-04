import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected");
    return;
  }

  const maxRetries = 3;
  let attempt = 1;

  while (attempt <= maxRetries) {
    try {
      await mongoose.connect(process.env.MONGODB_URI as string, {
        serverSelectionTimeoutMS: 10000, // 10 seconds to select a server
        connectTimeoutMS: 10000, // 10 seconds for initial connection
        socketTimeoutMS: 45000, // 45 seconds for socket inactivity
      });
      isConnected = true;
      console.log("MongoDB connected successfully");
      return;
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt} failed:`, error);
      if (attempt === maxRetries) {
        console.error("Max retries reached. Could not connect to MongoDB.");
        throw error;
      }
      // Wait 2 seconds before retrying
      await new Promise(resolve => setTimeout(resolve, 2000));
      attempt++;
    }
  }
};

export default connectDB;