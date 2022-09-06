import Order from "../models/order.model.js";

const getAllOrdersFromMail = async (userMail) => {
  try {
    const array = await Order.find({ userMail });
    const result = {
      status: 200,
      data: array,
      message: "Lista de ordenes.",
    };

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const getOneOrder = async (userMail, numero) => {
  try {
    let result = {
      status: 200,
      data: {},
      message: "",
    };

    const regFound = await Order.findOne({
      userMail,
      numero,
    });
    if (regFound) {
      result = {
        status: 200,
        data: regFound,
        message: "Registro encontrado.",
      };
    } else {
      result = {
        status: 404,
        data: null,
        message: "Registro no encontrado.",
      };
    }

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const addNewOrder = async (userMail, products) => {
  try {
    let numero = await findMaxNumberOrder();
    if (!numero) numero = 0;
    numero++;
    const newReg = new Order({
      numero,
      timestamp: +new Date(),
      estado: "generada",
      userMail,
      products,
    });
    newReg.save();
    const result = {
      status: 201,
      data: newReg,
      message: `Orden Número: ${numero} generada exitosamente.`,
    };

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const findMaxNumberOrder = async () => {
  try {
    const array = await Order.find({}).sort({ numero: 1 });
    const max = array[array.length - 1]?.numero;

    return max;
  } catch (error) {
    throw Error(error.message);
  }
};

export default { getAllOrdersFromMail, getOneOrder, addNewOrder };
