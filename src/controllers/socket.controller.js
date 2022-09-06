import messageServices from "../services/socketService.js";

export const getAllMessages = async (req, res) => {
  try {
    const result = await messageServices.getAllMessages();

    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessagesFromMail = async (req, res) => {
  try {
    const { email } = req.params;
    const result = await messageServices.getMessagesFromMail(email);

    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const postMessage = async (req, res) => {
  try {
    const { userMail, mensaje } = req.body;
    const message = {
      userMail,
      mensaje,
    };
    const io = req.app.get("socketio");

    const result = await messageServices.addMessage(message);
    io.emit("message", message);

    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
