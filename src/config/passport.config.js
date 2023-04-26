import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2"
import config from '../config/config.js';
import { checkPwd, createHash } from "../utils.js";
import { createUserService, existsUserService, getUserService, findUserByIdService } from "../services/sessions.service.js";

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await findUserByIdService(id);
        done(null, user);
    });

    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async(req, username, password, done) => {
            const { first_name, last_name, email, age} = req.body;
            try {
                if(await existsUserService(username)){
                    console.log('User already exists');
                    return done(null, false);
                };
                const cart = await cartModel.create({ products: [] });
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    cart: cart._id
                };
                const result = await createUserService(newUser);
                return done(null, result)
            } catch (error) {
                return done(`Error getting user ${error}`);
            }
        }
    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async(username, password, done) => {
        try {
            if(!await existsUserService(username)){
                console.log('User does not exist');
                return done(null, false);
            };
            const user = await getUserService(username);
            if(!checkPwd(user, password)) return done(null, false);
            return done(null, user);
        } catch (error) {
            console.log(error)
            return done(error);
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID: config.githubClientId,
        clientSecret: config.githubClientSecret,
        scope: ['user:email'],
        callbackURL:`http://localhost:${config.port}/api/sessions/githubcallback`
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await getUserService(profile.emails[0].value);
            if (!user) {
                const cart = await cartModel.create({ products: [] });
                const name = profile._json.name.split(' ');
                    let lastname = name.length > 1 ? name[name.length-1] : '';
                const newUser = {
                    first_name: name[0],
                    last_name: lastname,
                    email: profile.emails[0].value,
                    age: '',
                    password: '',
                    cart: cart._id
                }
                const result = await createUserService(newUser);
                done(null, result);
            } else {
                done(null, user);
            }
        } catch (error) {
            console.log(error)
            return done(error);
        }
    }));
}

export default initializePassport;