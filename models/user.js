import { Schema, model } from "mongoose"
import bcrypt from "bcrypt"

const usersCollection = 'user'

const userSchema = Schema({
    username: {
        type: String,
        require: true
    },
    nombre: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    direccion:{
        type:String
    },
    edad: { 
        type: Number
    },
    telefono: {
        type: String
    },
    foto: {
        type:String
    }
},{
    timestamps: false,
    versionKey: false
})

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = model(usersCollection, userSchema)