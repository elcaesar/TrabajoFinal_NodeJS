import { ObjectId } from "mongodb";
import Cart from "../models/cart.model.js";
import Product from "../models/productModel.js";
import orderServices from "./orderServices.js";

const getCart = async (userMail) => {
  try {
    const array = await Cart.findOne({ userMail });

    return array;
  } catch (error) {
    throw Error(error.message);
  }
};

const getProductsFromCart = async (userMail) => {
  try {
    const array = await getCart(userMail);
    const result = { status: 200, data: array.products };

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const findProductOnCart = async (userMail, idProduct) => {
  try {
    let status = 200;
    let message = "";
    const array = await getCart(userMail);
    const index = array.products.findIndex((x) => x._id == idProduct);
    if (index === -1) {
      // no encontrado: agregar
      await addProductToCart(userMail, idProduct);
      status = 201;
      message = "Producto agregado al carrito.";
    } else {
      // encontrado: icrementar cantidad
      array.products[index].cantidad++;
      await Cart.findOneAndUpdate({ userMail }, array, { new: true });
      message = "Se agregó una unidad del producto al carrito.";
    }

    return { status, message };
  } catch (error) {
    throw Error(error.message);
  }
};

const addProductToCart = async (userMail, idProduct) => {
  try {
    //db.collection-name.findOneAndUpdate({filter}, {update}, {options})
    const regAdd = await createProduct(idProduct);

    const upgradeCart = await Cart.findOneAndUpdate(
      { userMail },
      { $push: { products: regAdd } },
      { new: true }
    );

    return upgradeCart;
  } catch (error) {
    throw Error(error.message);
  }
};

const createProduct = async (idProduct) => {
  try {
    const regFound = await findProduct(idProduct);

    const regAdd = {
      _id: regFound._id,
      nombre: regFound.nombre,
      descripcion: regFound.descripcion,
      foto: regFound.foto,
      precio: regFound.precio,
      cantidad: 1,
    };

    return regAdd;
  } catch (error) {
    throw Error(error.message);
  }
};

const findProduct = async (idProduct) => {
  try {
    const regFound = await Product.findOne({ _id: ObjectId(idProduct) });

    return regFound;
  } catch (error) {
    throw Error(error.message);
  }
};

const decProductFromCart = async (userMail, idProduct) => {
  try {
    let status = 200;
    let message = "";
    const array = await getCart(userMail);
    const index = array.products.findIndex((x) => x._id == idProduct);
    if (index > 0) {
      if (array.products[index].cantidad > 1) {
        // decrementar la cantidad de productos en uno
        array.products[index].cantidad--;
        message = "Se quitó una unidad del producto en el carrito.";
      } else {
        // eliminar el producto del carrito
        array.products.splice(index, 1);
        message = "Producto quitado del carrito.";
      }
      await Cart.findOneAndUpdate({ userMail }, array, { new: true });
    } else {
      status = 404;
      message = "Producto no encontrado.";
    }

    return { status, message };
  } catch (error) {
    throw Error(error.message);
  }
};

const deleteCart = async (userMail) => {
  try {
    let result = {
      status: 200,
      message: "Carrito vaciado.",
      data: [],
      sendMailTo: "",
    };
    const array = await getCart(userMail);

    if (array.products.length > 0) {
      result = {
        status: 200,
        message:
          "Orden de pedido creada. Recibirá los datos del pedido por mail.",
        data: array.products,
        sendMailTo: array.userMail,
      };
      await createOrder(userMail, array.products);
      await emptyCart(userMail);
    } else {
      result = {
        status: 200,
        message: "Carrito sin productos cargados.",
        data: [],
        sendMailTo: "",
      };
    }

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const emptyCart = async (userMail) => {
  try {
    await Cart.findOneAndUpdate(
      { userMail },
      { $set: { products: [] } },
      { new: true }
    );

    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

const createOrder = async (userMail, products) => {
  try {
    const result = await orderServices.addNewOrder(userMail, products);

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

export default {
  getProductsFromCart,
  findProductOnCart,
  decProductFromCart,
  deleteCart,
};
