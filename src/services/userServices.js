import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";

const getOneUser = async (email) => {
  try {
    let result = {
      status: 200,
      data: {},
      message: "",
    };

    const regFound = await User.findOne({ email });
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

const addNewUserAndCart = async (user) => {
  try {
    let result = {
      status: 200,
      data: {},
      message: "",
    };

    const regExists = await findOneUser(user.email);
    if (regExists) {
      result = {
        status: 409,
        data: regExists,
        message: "El email ya se encuentra en la base de datos.",
      };
    } else {
      const newUser = createNewUser(user);
      newUser.save();

      const newCart = createNewCart(user.email);
      newCart.save();

      result = {
        status: 201,
        data: newCart,
        message: "Registro agregado.",
      };
    }

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const createNewUser = (user) => {
  try {
    const { nombre, email, password, direccion, edad, celular, avatar } = user;
    const newReg = new User({
      nombre,
      email,
      password,
      direccion,
      edad,
      celular,
      avatar,
    });

    return newReg;
  } catch (error) {
    throw Error(error.message);
  }
};

const createNewCart = (userMail) => {
  try {
    const newReg = new Cart({
      userMail,
      timestamp: +new Date(),
      products: [],
    });

    return newReg;
  } catch (error) {
    throw Error(error.message);
  }
};

const findOneUser = async (email) => {
  try {
    const regFound = await User.findOne({ email });

    return regFound;
  } catch (error) {
    throw Error(error.message);
  }
};

export default { addNewUserAndCart, getOneUser };
