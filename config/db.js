import mongoose from "mongoose";

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connectDB = async () => {
  try {
    const dbConnection = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@reactgram.vsgokeu.mongodb.net/?retryWrites=true&w=majority&appName=ReactGram`
    );
    console.log("MongoDB connected");
    return dbConnection;
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
