import { Router } from "express";
export const routerLogin = Router();
import { logout, signin } from '../controllers/userController.js'

routerLogin.get('/login', (req, res) => res.render('login'))
routerLogin.post('/login', signin);
routerLogin.get('/logout', logout);
routerLogin.get('/error-login', (req, res) => res.render('faillogin'))