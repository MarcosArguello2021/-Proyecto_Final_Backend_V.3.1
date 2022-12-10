import {User} from "../models/user.js"

export const dataUser=async (user)=>{
    const usuario= await User.findOne({username:user})
    const {nombre, username, direccion, foto, edad, telefono} = usuario;
    const datos={nombre, username, direccion, foto, edad,telefono}
    return datos
}