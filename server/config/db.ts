import mongoose from "mongoose";
import logger from "../utils/logger";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 5000, //// Timeout after 5s instead of 30s
    });
    const { host } = conn.connection;
    const { name: dbName } = conn.connection;

    logger.info(
      `MongoDB connected: ${conn.connection.host}, host: ${host}, database: ${dbName}`
    );
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    // Don't exit in development, just log
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

mongoose.connection.on("disconnected", () => {
  logger.warn("MongoDB disconnected. Attempting to reconnect...");
});

mongoose.connection.on("error", (err) => {
  logger.error("MongoDB error:", err.message);
});

mongoose.connection.on("reconnected", () => {
  logger.info("MongoDB reconnected");
});

export default connectDB;
