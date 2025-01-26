import { connect } from "mongoose";

const mongodb_uri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/online-ticket-system";

console.log({ mongodb_uri });
export const connectDB = async () => {
  try {
    await connect(mongodb_uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};
