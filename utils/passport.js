import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { User } from "../models/user.js"
import { logger } from "../utils/logger.js";

passport.use(new LocalStrategy({
    usernameField: "email",
},
async (username, password, done) => {
    const user = await User.findOne({ username: username })
    if (!user) {
        return done(null, false, { message: "Usuario no encontrado" })
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return done(null, false, { message: "Contraseña incorrecta" })
    }
    return done(null, user)
}
))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})

export default passport;