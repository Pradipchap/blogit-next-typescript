import mongoose from "mongoose";
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  const mongodb_uri = process.env.MONGODB_URI;

  if (typeof mongodb_uri === "undefined") {
    return;
  }

  if (isConnected) {
    console.log("MongoDB is already connected ");
    return;
  }
  try {
    await mongoose.connect(mongodb_uri, {
      dbName: "Blogs",
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error while connecting", error);
  }
};
