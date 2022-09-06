import { query } from 'express';
import Product from  '../models/products.model.js';

export const createProduct = async (req,res) => {
  const { codigo, nombre, descripcion, categoria, imgURL, precio, stock } = req.body;
  const newProduct = new Product({codigo, nombre, descripcion, categoria, imgURL, precio, stock});
  const productSaved = await newProduct.save();
  res.status(201).json(productSaved);
};

export const getProducts = async (req,res) => {
  //try {
    const productsList = await Product.find();
    console.log(productsList);
    res.render('products/list', { productsList });

    //res.status(200).json(productsList);
  //} catch (error) {
    //res.status(500).json({message: 'Hubo un error al recuperar la lista de productos', err: error})
  //}
};
export const getProductById = async (req,res) => {
  try {
    const productFound = await Product.findById(req.params.id);
    res.status(200).json(productFound);
  } catch (error) {
    res.status(500).json({message: 'Error al recuperar el producto', err: error})
  }
};
export const updateProductById = async (req,res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({message: 'Error al actualizar el producto.', err: error});
  }
};

export const deleteProductById = async (req,res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.status(200).json({msg:'El producto ha sido eliminado'});
  } catch (error) {
   res.status(500).json({message: 'Error al intentar eliminar el producto', err: error});
  }
};

