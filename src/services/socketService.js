import "dotenv/config";
import Message from "../models/socket.model.js";

const mailAdmin = process.env.MAIL_ADMIN;

const getAllMessages = async () => {
  try {
    const array = await Message.find({});
    const result = {
      status: 200,
      data: array,
      message: "Lista de mensajes.",
    };

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const getMessagesFromMail = async (userMail) => {
  try {
    const array = await Message.find({ userMail });
    const result = {
      status: 200,
      data: array,
      message: "Lista de mensajes, filtrada por email.",
    };

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const addMessage = async (message) => {
  try {
    const { userMail, mensaje } = message;
    const newReg = new Message({
      timestamp: +new Date(),
      userMail,
      tipo: userMail === mailAdmin ? "Sistema" : "Usuario",
      mensaje,
    });
    newReg.save();
    const result = {
      status: 201,
      data: newReg,
      message: "Registro agregado.",
    };

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

export default { getAllMessages, getMessagesFromMail, addMessage };
