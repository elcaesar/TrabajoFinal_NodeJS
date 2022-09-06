import { Router } from 'express';
import passport from 'passport';
import * as authCtrl from '../controllers/auth.controller.js';

const router = Router();
//POST signup
router.post('/signup', authCtrl.signup);

//POST signin
router.post('/signin', authCtrl.signin);

export default router;