import {User} from "../models/user.js"
import passport from '../utils/passport.js'
import mongoose from 'mongoose'
import config from '../config.js'
import { mailRegistro } from "../utils/armarMail.js";
import { enviarWSP } from "../utils/twilio.js";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)

export const signup = async (req, res) => {
    const username= req.body.username
    const{nombre,direccion,edad,telefono,pais, password}=req.body
    const foto=`/imagenes/${username}`
    const tel = pais+telefono    
    const body={username, nombre,direccion,telefono:tel,edad,foto}
    const userFound = await User.findOne({ username: username })
    if (userFound) {
        return res.redirect("/api/error-registro")
    }
    const newUser = new User(body)
    newUser.password = await newUser.encryptPassword(password)
    await newUser.save();
    const SMSbody = `Pedido ${body.username} recibido y en preparación`
    enviarWSP(SMSbody);
    mailRegistro(body)
    res.redirect('/api/login')
};

export const signin = passport.authenticate('local', {
    successRedirect: "/api/productos",
    failureRedirect: "/api/error-login",
})

export const logout = async (req, res, next)=> {
    let idSession = req.session.passport.user
    let userInfo = await User.findOne({ '_id': idSession })
    let infoUser = userInfo.email
    await req.logout((err) => {
        if (err) return next(err)
        return res.render("logout", { infoUser })
    })
}
export const auth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/api/login');
    }
}
