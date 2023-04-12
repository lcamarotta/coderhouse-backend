import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2"
import User from "../dao/dbManagers/users.js";
import { checkPwd, createHash } from "../utils.js";

const userManager = new User;
const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userManager.findById(id);
        done(null, user);
    });

    passport.use('register', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async(req, username, password, done) => {
            const { first_name, last_name, email, age} = req.body;
            try {
                if(await userManager.exists(username)){
                    console.log('User already exists');
                    return done(null, false);
                };
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                };
                const result = await userManager.create(newUser);
                return done(null, result)
            } catch (error) {
                return done(`Error getting user ${error}`);
            }
        }
    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async(username, password, done) => {
        try {
            if(!await userManager.exists(username)){
                console.log('User does not exist');
                return done(null, false);
            };
            const user = await userManager.get(username)
            if(!checkPwd(user, password)) return done(null, false);
            return done(null, user);
        } catch (error) {
            console.log(error)
            return done(error);
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID:"Iv1.334ccdc8185cbca4",
        clientSecret:"9072f6b6d06e7621b08794ef00b1ee1587d3b978",
        scope: ['user:email'],
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    }, async(accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            let user = await userManager.get(profile.emails[0].value);
            if (!user) {
                const name = profile._json.name.split(' ');
                const newUser = {
                    first_name: name[0],
                    last_name: name[name.length-1] || '',
                    age: '',
                    email: profile.emails[0].value,
                    password: ''
                }
                const result = await userManager.create(newUser);
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