import { senderMailCart, sendSMS } from "../services/communicationsService.js";

import cartServices from "../services/cartServices.js";

// Lista los productos del carrito
export const getProductsFromCart = async (req, res) => {
  try {
    const userMail = req.user.email;
    const result = await cartServices.getProductsFromCart(userMail);

    res.status(result.status).json(result.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Agrega un producto a un carrito
export const postProductOnCart = async (req, res) => {
  try {
    const userMail = req.user.email;
    const { id_prod } = req.body; // <= id del producto

    const result = await cartServices.findProductOnCart(userMail, id_prod);

    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Elimina un producto o decrementa la cantidad en el carrito
export const deleteProductFromCart = async (req, res) => {
  try {
    const userMail = req.user.email;
    const { id_prod } = req.params; // id del producto
    const result = await cartServices.decProductFromCart(userMail, id_prod);

    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// "vacíar" el carrito
export const deleteCart = async (req, res) => {
  try {
    const userMail = req.user.email;
    const result = await cartServices.deleteCart(userMail);

    if (result.sendMailTo != "")
      await senderMailCart(result.data, result.sendMailTo);

    res.status(result.status).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
