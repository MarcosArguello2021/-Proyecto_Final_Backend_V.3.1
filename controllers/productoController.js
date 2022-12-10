import { productosDao as productosApi } from '../dao/index.js'
import {dataUser} from '../utils/datosNavbar.js'

export const cargar = async(req, res) => {  
    const productos = await productosApi.getAll()
    if(productos.length === 0){
        res.send({ "error" : "No existen productos cargados" })    
    }else{
        res.send(productos)    
    }   
}

export const buscarPorId = async(req, res) => { 
    try {
        
        res.send(await productosApi.getById(req, res)) 
    } catch (error) {
         res.status(400).json({ error: '-1, No se encuentra el producto' })
    }
}

export const guardarProducto = async(req, res) => { 
    if (administrador) {
        const data = req.body;
        const { nombre, precio, urlImagen, descripcion, codigo, stock } = data;
        if (!nombre || !precio || !urlImagen || !descripcion || !codigo || !stock) {
            res.status(400).json({ error: 'por favor, ingrese todos los datos del producto' })
        } else {
            let objeto = [];
            const objetos = await productosApi.getAll();
            let newId;
            if (objetos.length == 0) {
                newId = 1;
            } else {
                const ultimoId = parseInt(objetos[objetos.length - 1].id);
                newId = ultimoId + 1;
            }
            const timeStamp = Date.now()
            objeto.push({
                ...data, id: newId, timeStamp: timeStamp
            });
            try {
                await productosApi.save(objeto)
                res.status(200).json({ mensaje: 'Nuevo producto guardado' })
            } catch (error) {
                res.status(500).json({ error: 'Error al guardar' })
            }
        }
    } else {
        res.status(400).json({ error: '-1, usted no tiene permisos de administrador' })
    }
           
}

export const updateProducto = async(req, res) => { //Recibe y actualiza un producto según su id
    if (administrador) {
        const idParam = Number(req.params.id);
        const { nombre, precio, urlImagen, descripcion, codigo, stock } = req.body;
        if (!nombre || !precio || !urlImagen || !descripcion || !codigo || !stock) {
            res.status(400).json({ error: 'Por favor, ingrese todos los datos del producto' })
        } else {
            try {
                const lista = await this.getAll();
                const index = lista.findIndex(p => p.id == idParam)
                if (index === -1) {
                    return res.status(200).json({ error: 'Producto no encontrado' });
                } else {
                    const actualizacion = {
                        "nombre": nombre,
                        "precio": precio,
                        "urlImagen": urlImagen,
                        "descripcion": descripcion,
                        "codigo": codigo,
                        "stock": stock,
                    };
                    let timeStamp = Date.now();
                    lista[index] = { ...actualizacion, id: idParam, timeStamp: timeStamp };
                    await productosApi.putById(parseInt(req.params.id),lista)
                    res.status(200).json({ mensaje: 'Producto actualizado con exito' })
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    } else {
        res.status(400).json({ error: '-1, usted no tiene permisos de administrador' })
    }
}

export const borrarProducto = async(req, res) => { 
    if(administrador){  
        try {
        const producto = await productosApi.getById(req, res)
        if (!producto) {
            return res.status(400).json({ error : "Producto no encontrado" });
        } else {
                await productosApi.deleteById(req, res);
                res.status(200).json({ mensaje: 'Producto borrado con exito' })
            } 
        }catch (error) {
                res.status(400).json({ error: '-1, No se encontró el ID' })    
            }
        } else{
        res.status(400).json({ error: '-1, usted no tiene permisos de administrador' })        
    }    
}
