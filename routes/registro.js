import { Router } from "express";
export const routerRegistro = Router();
import { signup } from '../controllers/userController.js'
import { pais } from "../utils/countryCodes.js";
import { upload } from "../utils/multer.js";

routerRegistro.get('/registro', (req, res) => res.render('register', { pais: pais}))
routerRegistro.post('/registro', upload.single('avatar'),  signup)
routerRegistro.get('/error-registro', (req, res) => res.render('failregister'))

