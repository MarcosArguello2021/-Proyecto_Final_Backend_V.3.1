import {dataUser} from '../utils/datosNavbar.js'
import {
    carritosDao as carritosApi,
    productosDao as productosApi
} from '../dao/index.js'

export const crearCarrito = async (req, res) => {
    let newId;
    const objeto = { productos: [] };
    const carritos = await carritosApi.getAll();
    if (carritos.length == 0) {
        newId = 1
    } else {
        newId = carritos[carritos.length - 1].id + 1
    }
    const fecha = new Date();
    const newObj = { ...objeto, id: newId, timeStamp: fecha }
    
    try {
        const carritoCreado = await carritosApi.save(newObj);
        
        res.send({ id: carritoCreado.id });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar' })
    }
}

export const borrarCarrito = async (req, res) => {
    try {
        const carrito = await carritosApi.getById(req, res)
        if (!carrito) {
            return res.status(400).json({ error: "Carrito no encontrado" });
        } else {
            await carritosApi.deleteById(req, res);
            res.status(200).json({ mensaje: 'Carrito borrado con exito' })
        }
    } catch (error) {
        res.status(400).json({ error: '-1, No se encontró el ID' })
    }
}

export const buscarPorIdCarrito = async (req, res) => { 
    try {
        const carrito = await carritosApi.getById(req, res);
        res.send(carrito);
    } catch (error) {
        return res.status(400).json({ error: "Carrito no encontrado" });
    }
}

export const actulizarCarrito = async (req, res) => { 
    const carrito = await carritosApi.getById(req, res)
    const producto = await productosApi.getById(req, res)
    carrito.productos.push(producto)
    await carritosApi.update(carrito)
    res.end()
}

export const borrarProductoCarritoPorId = async (req, res) => { 
    const carrito = await carritosApi.getById(req, res);
    const index = carrito.productos.findIndex(p => p.id == req.params.idProd);
    if (index != -1) {
        carrito.productos.splice(index, 1);
        await carritosApi.update(carrito);
    }
    res.end()}