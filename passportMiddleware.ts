import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import dotenv from "dotenv";
import user from "./models/user_model";

dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || ""    
};

passport.use(new Strategy(options, async (payload, done) => {
    const { type, userId } = payload;
    
    if (!type || type !== "session") {
        return done(null, undefined);
    }
    try {
        const userData = await user.getUser(userId);
        
        if (!userData) return done(null, undefined)

        return done(null, userData)

    } catch (e) {
        console.log("passport strategy: ", e);
        return done(e, undefined)
    }
}));

export default passport.authenticate("jwt", {session: false});