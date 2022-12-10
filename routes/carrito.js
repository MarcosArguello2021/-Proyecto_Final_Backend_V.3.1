import { Router } from "express";
import { crearCarrito, borrarCarrito, buscarPorIdCarrito, actulizarCarrito, borrarProductoCarritoPorId } from "../controllers/carritoController.js";

export const carritoRouter = Router();

carritoRouter.post('/carrito', crearCarrito);

carritoRouter.delete('/carrito/:id', borrarCarrito);

carritoRouter.get('/carrito/:id/productos', buscarPorIdCarrito);  

carritoRouter.post('/carrito/:id/productos', actulizarCarrito);

carritoRouter.delete('/carrito/:id/productos/:id_prod', borrarProductoCarritoPorId);

