import mongoose, { Mongoose } from "mongoose";
let isConnected = false;
let x: Mongoose | null = null;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return x;
  }
  try {
    x = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "Blogs",
    });
    isConnected = true;
    return x;
  } catch (error) {
    return null;
  }
};
