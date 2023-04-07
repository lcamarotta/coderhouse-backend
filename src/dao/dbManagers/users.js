import { checkPwd, errorHandler } from "../../utils.js";
import userModel from "../models/users.js";

export default class User {
	constructor() {
		console.log('DB Manager - USERS')
	};

	exists = async (email) => {
        try {
            return await userModel.findOne({ email }) ? true : false;
        } catch (error) {
            throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
        }
    };

	get = async (email) => {
        try {
            return await userModel.findOne({ email });
        } catch (error) {
            throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
        }
    };

	findById = async (id) => {
        try {
            return await userModel.findById(id);
        } catch (error) {
            throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
        }
    };

    create = async (user) => {
        try {
            if(user.email.startsWith('admin')) user['role'] = 'admin';
            const result = await userModel.create(user);
            return result;
        } catch (error) {
            throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
        }
    };

    login = async (email, password) => {
        try {
            const result = await userModel.findOne({ email });
            if (!result) throw new errorHandler(401, 'User not found');
            if (!checkPwd(result, password)) throw new errorHandler(401, 'Incorrect password');
            const user = {
                name: `${result.first_name} ${result.last_name}`,
                email: result.email,
                age: result.age,
                role: result.role
            }
            return user;
        } catch (error) {
            throw new errorHandler(error.httpStatusCode || 500, `${error.msg || error}`)
        }
    };
}