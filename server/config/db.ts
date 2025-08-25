import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    const { host } = conn.connection;
    const { name: dbName } = conn.connection;

    logger.info(
      `MongoDB connected: ${conn.connection.host}, host: ${host}, database: ${dbName}`
    );
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
