import { ObjectId } from "mongodb";
import Product from "../models/productModel.js";

const getProducts = async (id) => {
  try {
    let result = {};
    if (id) {
      result = await getOneProduct(id);
    } else {
      result = await getAllProducts();
    }

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const getAllProducts = async () => {
  try {
    const array = await Product.find({});
    const result = {
      status: 200,
      data: array,
      message: "Lista de productos.",
    };

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const getOneProduct = async (id) => {
  try {
    let result = {
      status: 200,
      data: {},
      message: "",
    };

    const reg = await Product.findOne({ _id: ObjectId(id) });
    if (reg) {
      result = {
        status: 200,
        data: reg,
        message: "Registro encontado.",
      };
    } else {
      result = {
        status: 404,
        data: null,
        message: "Registro no encontado.",
      };
    }

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const getProductsFromCategories = async (categoria) => {
  try {
    const array = await Product.find({ categoria });

    let result = {
      status: 200,
      data: array,
      message: "Lista de productos, filtrada por categría.",
    };

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const addProduct = async (product) => {
  try {
    let result = {
      status: 200,
      data: {},
      message: "",
    };

    const regExists = await findOneProduct(product.codigo);
    if (regExists) {
      result = {
        status: 409,
        data: regExists,
        message: "Código ya asignado a otro Producto.",
      };
    } else {
      const newReg = new Product({
        timestamp: +new Date(),
        nombre: product.nombre,
        categoria: product.categoria,
        descripcion: product.descripcion,
        codigo: product.codigo,
        foto: product.foto,
        precio: product.precio,
        stock: product.stock,
      });
      newReg.save();
      result = {
        status: 201,
        data: newReg,
        message: "Registro agregado.",
      };
    }

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const findOneProduct = async (codigo) => {
  try {
    const reg = await Product.findOne({ codigo });

    return reg;
  } catch (error) {
    throw Error(error.message);
  }
};

const updateProduct = async (id, product) => {
  try {
    let result = {
      status: 200,
      data: null,
      message: "",
    };

    const _id = ObjectId(id);
    const { nombre, descripcion, categoria, codigo, foto, precio, stock } =
      product;
    const reg = await Product.findOneAndUpdate(
      { _id },
      { nombre, descripcion, categoria, codigo, foto, precio, stock },
      { new: true }
    );

    if (reg) {
      result = {
        status: 200,
        data: reg,
        message: "Registro actualizado.",
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

const deleteProduct = async (id) => {
  try {
    let result = {
      status: 200,
      data: null,
      message: "",
    };

    const _id = ObjectId(id);
    const reg = await Product.findOneAndDelete({ _id });
    if (reg) {
      result = {
        status: 200,
        data: reg,
        message: "Registro eliminado.",
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

export default {
  getProducts,
  getProductsFromCategories,
  addProduct,
  updateProduct,
  deleteProduct,
};
