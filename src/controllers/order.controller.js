import orderServices from "../services/orderServices.js";

export const getAllOrders = async (req, res) => {
  try {
    const userMail = req.user.email;
    const result = await orderServices.getAllOrdersFromMail(userMail);

    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneOrder = async (req, res) => {
  try {
    const userMail = req.user.email;
    const { numero } = req.params;
    const result = await orderServices.getOneOrder(userMail, numero);

    res
      .status(result.status)
      .json({ message: result.message, data: result.data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
