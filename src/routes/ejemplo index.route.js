import { Router } from 'express';
import { getProducts } from '../controllers/products.controller.js';

const router = Router();

router.get('/', (req,res) => {
  res.render('products/list');
})

export default router;