import "dotenv/config";
import mongoose from "mongoose";

//const mUri = process.env.MONGO_ATLAS;
const mUri = process.env.MONGO_URI + "/" + process.env.MONGO_COLLECTION;
const mOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(mUri, mOptions);

const schema = new mongoose.Schema({
  timestamp: Number,
  numero: {
    type: Number,
    required: [true, "El número de orden es requerido"],
  },
  userMail: {
    type: String,
    required: [true, "El email es requerido"],
  },
  estado: {
    type: String,
    required: [true, "El estado es requerido"],
    default: "generada",
  },
  products: [],
});

export default mongoose.model("Order", schema);
