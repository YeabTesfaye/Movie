import mongoose from "mongoose";
mongoose.set("strictQuery", false);
const url = process.env.MONGO_URI;

const CONNECTDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default CONNECTDB;
