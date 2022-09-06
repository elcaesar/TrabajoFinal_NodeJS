import "dotenv/config";
import mongoose from "mongoose";

//const mUri = process.env.MONGO_ATLAS;
const mUri = process.env.MONGO_URI + "/" + process.env.MONGO_COLLECTION;
const mOptions = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.connect(mUri, mOptions);

const schema = new mongoose.Schema({
  timestamp: Number,
  userMail: {
    type: String,
    required: [true, "El email es requerido"],
  },
  tipo: {
    type: String,
    required: [true, "El tipo es requerido"],
  },
  mensaje: {
    type: String,
    required: [true, "El mensaje es requerida"],
  },
});

export default mongoose.model("Message", schema);
