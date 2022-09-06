import "dotenv/config";
import mongoose from "mongoose";

//const mUri = process.env.MONGO_ATLAS;
const mUri = process.env.MONGO_URI + "/" + process.env.MONGO_COLLECTION;
const mOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(mUri, mOptions);

const schema = new mongoose.Schema({
  userMail: String,
  timestamp: Number,
  products: [],
});

export default mongoose.model("Cart", schema);
