import { Router } from 'express';
import * as productController from '../controllers/products.controller.js';

const router = Router();

router.post('/', productController.createProduct); //create product
router.get('/', productController.getProducts); // list products
router.get('/:id', productController.getProductById); // get a product
router.put('/:id', productController.updateProductById); //update a product
router.delete('/:id', productController.deleteProductById); //delete a product

export default router;