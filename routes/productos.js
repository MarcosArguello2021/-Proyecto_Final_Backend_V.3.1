import { Router } from "express";
import {cargar, buscarPorId, guardarProducto, updateProducto, borrarProducto} from "../controllers/productoController.js"

export const productosRouter = Router();

productosRouter.use((req,res,next)=>{
    if(req.session.passport) next()
    else res.redirect('/api/login')
})

productosRouter.get('/productos', cargar)

productosRouter.get('/productos/:id?', buscarPorId);

productosRouter.post('/productos', guardarProducto)

productosRouter.put('/productos/:id', updateProducto)

productosRouter.delete('/productos/:id', borrarProducto)
