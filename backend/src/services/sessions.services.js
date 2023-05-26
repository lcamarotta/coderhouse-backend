import { createUserRepository, existsUserRepository, findUserByIdRepository, getUserRepository, addOrderToUserRepository } from "../repository/sessions.repository.js";

const createUserService = async(newUser) => await createUserRepository(newUser);
const existsUserService = async(username) => await existsUserRepository(username);
const getUserService = async(username) => await getUserRepository(username);
const findUserByIdService = async(id) => await findUserByIdRepository(id);
const addOrderToUserService = async(email, orderId) => addOrderToUserRepository(email, orderId);

function auth(role) {
    
    return function(req, res, next) {
      
        if(role == 'public') return next();
        if(role == 'notloggedin') return req.session.user ? res.status(400).send({ error: 'already authenticated' }) : next();

        if(req.session.user){
            if(role == 'any') return next();
            if(role == 'user') return req.session.user.role == 'user' ? next() : res.status(403).send({ error: 'forbidden, not authenticated'});
            if(role == 'admin') return req.session.user.role == 'admin' ? next() : res.status(403).send({ error: 'forbidden, user is not admin'});
        }

        return res.status(403).send({ error: 'forbidden'});
    
    }
  }

export {
    auth,
    createUserService,
    existsUserService,
    getUserService,
    findUserByIdService,
    addOrderToUserService
}