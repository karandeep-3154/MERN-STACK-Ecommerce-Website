import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB ${con.connection.host}`.bgBlue.white);
  } catch (err) {
    console.log(err.bgRed.white);
  }
};
export default connectDB;
